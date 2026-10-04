import React, {
  useState,
  useMemo,
  useCallback,
  useRef,
  useEffect,
} from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  Modal,
  TouchableWithoutFeedback,
  Platform,
  NativeSyntheticEvent,
  NativeScrollEvent,
  TextStyle,
  useColorScheme,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import * as Haptics from "expo-haptics";
import { useColors } from "@/hooks/useColors";
import { useSubscriptions } from "@/context/SubscriptionContext";
import { SubscriptionIcon } from "@/components/SubscriptionIcon";
import { GlassHeader, ViewMode } from "@/components/appHeader";
import {
  Subscription,
  getMonthlyTotal,
  getDayLabel,
} from "@/constants/subscriptions";
import colors from "@/constants/colors";

const H_PAD = 16;
const GAP = 1.8;
const MAX_CONTENT_WIDTH = 480;

const MONTHS_BEFORE = 12;
const MONTHS_AFTER = 12;
const GRID_ROWS = 6;

const DAY_NAMES = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

// ── Reusable Typography Styles ─────────────────────────────────────────────
const Typography = {
  h1: {
    fontFamily: "SFEB",
    fontSize: 34,
    lineHeight: 41,
    letterSpacing: -1.8,
  } as TextStyle,
  h2: {
    fontFamily: "SFB",
    fontSize: 28,
    lineHeight: 30,
    letterSpacing: -1.4,
  } as TextStyle,
  sectionHeader: {
    fontFamily: "SF",
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: -1.2,
  } as TextStyle,
  body: {
    fontFamily: "SF",
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: -0.8,
  } as TextStyle,
  caption: {
    fontFamily: "SF",
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: -0.6,
  } as TextStyle,
  subtle: {
    fontFamily: "SF",
    fontSize: 12,
    lineHeight: 14,
    letterSpacing: -0.4,
  } as TextStyle,
  pillLabel: {
    fontFamily: "SF",
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: -0.3,
  } as TextStyle,
};

function daysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function firstWeekdayOffset(year: number, month: number) {
  const jsDay = new Date(year, month, 1).getDay();
  return (jsDay + 6) % 7;
}

function monthName(year: number, month: number) {
  return new Date(year, month, 1).toLocaleDateString("en-US", {
    month: "long",
  });
}

function buildMonthCells(year: number, month: number): (number | null)[] {
  const offset = firstWeekdayOffset(year, month);
  const total = daysInMonth(year, month);
  const cells: (number | null)[] = [];
  for (let i = 0; i < offset; i++) cells.push(null);
  for (let d = 1; d <= total; d++) cells.push(d);
  while (cells.length < GRID_ROWS * 7) cells.push(null);
  return cells.slice(0, GRID_ROWS * 7);
}

interface MonthMeta {
  key: string;
  year: number;
  month: number;
}

function useMonthRange(before: number, after: number): MonthMeta[] {
  return useMemo(() => {
    const now = new Date();
    const baseYear = now.getFullYear();
    const baseMonth = now.getMonth();
    const list: MonthMeta[] = [];
    for (let i = -before; i <= after; i++) {
      const d = new Date(baseYear, baseMonth + i, 1);
      list.push({
        key: `${d.getFullYear()}-${d.getMonth()}`,
        year: d.getFullYear(),
        month: d.getMonth(),
      });
    }
    return list;
  }, [before, after]);
}

function useGridMetrics(containerWidth: number) {
  return useMemo(() => {
    const cardWidth = containerWidth - H_PAD * 2;
    const gridWidth = cardWidth;
    const cellSize = Math.floor((gridWidth - GAP * 6) / 7);
    const cardHeight = GRID_ROWS * cellSize + (GRID_ROWS - 1) * GAP;
    return { cellSize, cardHeight, cardWidth };
  }, [containerWidth]);
}

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const colors = useColors();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const { subscriptions } = useSubscriptions();
  const { width: windowWidth } = useWindowDimensions();
  const contentWidth = Math.min(windowWidth, MAX_CONTENT_WIDTH);
  const { cellSize, cardHeight, cardWidth } = useGridMetrics(contentWidth);

  const [viewMode, setViewMode] = useState<ViewMode>("calendar");
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [expensePeriod, setExpensePeriod] = useState<"monthly" | "yearly">("monthly");

  const today = useMemo(() => new Date(), []);
  const [activeYear, setActiveYear] = useState(today.getFullYear());
  const [activeMonth, setActiveMonth] = useState(today.getMonth());
  const activeMonthName = useMemo(
    () => monthName(activeYear, activeMonth),
    [activeYear, activeMonth],
  );
  const showYear = activeYear !== today.getFullYear();

  const formattedTodayString = useMemo(() => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      day: "numeric",
      month: "long",
    };
    return today.toLocaleDateString("en-US", options);
  }, [today]);

  const monthlyTotal = useMemo(
    () => getMonthlyTotal(subscriptions),
    [subscriptions],
  );

  const yearlyTotal = useMemo(
    () => monthlyTotal * 12,
    [monthlyTotal],
  );

  const displayTotal = expensePeriod === "monthly" ? monthlyTotal : yearlyTotal;

  const selectedDaySubs = useMemo(
    () =>
      selectedDay
        ? subscriptions.filter((s) => s.billingDay === selectedDay)
        : [],
    [selectedDay, subscriptions],
  );

  const dayTotal = useMemo(
    () => selectedDaySubs.reduce((sum, s) => sum + s.price, 0),
    [selectedDaySubs],
  );

  const months = useMonthRange(MONTHS_BEFORE, MONTHS_AFTER);
  const scrollRef = useRef<ScrollView>(null);

  const currentMonthIndex = useMemo(() => {
    return months.findIndex(
      (m) => m.year === activeYear && m.month === activeMonth
    );
  }, [months, activeYear, activeMonth]);

  const handleMonthIndexChange = useCallback(
    (index: number) => {
      const targetMonth = months[index];
      if (targetMonth) {
        setActiveYear(targetMonth.year);
        setActiveMonth(targetMonth.month);
        scrollRef.current?.scrollTo({
          x: index * contentWidth,
          animated: true,
        });
      }
    },
    [months, contentWidth]
  );

  const handlePrevMonth = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (currentMonthIndex > 0) {
      handleMonthIndexChange(currentMonthIndex - 1);
    }
  }, [currentMonthIndex, handleMonthIndexChange]);

  const handleNextMonth = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (currentMonthIndex < months.length - 1) {
      handleMonthIndexChange(currentMonthIndex + 1);
    }
  }, [currentMonthIndex, months.length, handleMonthIndexChange]);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      scrollRef.current?.scrollTo({
        x: currentMonthIndex * contentWidth,
        animated: false,
      });
    });
    return () => cancelAnimationFrame(id);
  }, [contentWidth]);

  const handleDayPress = useCallback(
    (day: number) => {
      const daySubs = subscriptions.filter((s) => s.billingDay === day);
      if (daySubs.length > 0) {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        setSelectedDay(day);
      }
    },
    [subscriptions],
  );

  const handleSubPress = useCallback((sub: Subscription) => {
    setSelectedDay(null);
    setTimeout(() => {
      router.push({ pathname: "/detail", params: { id: sub.id } });
    }, 150);
  }, []);

  const handleAddSubscription = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push({ pathname: "/add" });
  }, []);

  const handleMonthChange = useCallback((year: number, month: number) => {
    setActiveYear(year);
    setActiveMonth(month);
  }, []);

  const handleLeftPress = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  }, []);

  const handleProfilePress = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  }, []);

  const topPad = insets.top + (Platform.OS === "web" ? 67 : 0);
  const bottomPad = insets.bottom + (Platform.OS === "web" ? 34 : 0);

  return (
    <LinearGradient
      colors={["#F4F8FA", "#EBF2F6", "#E2ECF2"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.screen, { paddingTop: topPad, backgroundColor: colors.background }]}
    >
      <View style={styles.contentWrap}>
        <GlassHeader
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          onLeftPress={handleLeftPress}
          onProfilePress={handleProfilePress}
        />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: bottomPad + 24 }}
        >
          <View style={styles.headerSection}>
            {/* Wallet-style Total Card with Period Switcher */}
            <View style={[styles.largePriceCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <View style={styles.walletHeaderRow}>
                <View style={styles.walletLabelGroup}>
                  <Feather name="pie-chart" size={14} color={colors.mutedForeground} />
                  <Text style={[styles.cardSubtitle, { color: colors.mutedForeground }]}>
                    Total {expensePeriod} expenses
                  </Text>
                </View>
                <View style={[styles.periodSwitchContainer, { backgroundColor: colors.secondary }]}>
                  <TouchableOpacity
                    style={[
                      styles.periodSwitchBtn,
                      expensePeriod === "monthly" && { backgroundColor: colors.card },
                    ]}
                    onPress={() => {
                      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                      setExpensePeriod("monthly");
                    }}
                    activeOpacity={0.8}
                  >
                    <Text
                      style={[
                        styles.periodSwitchText,
                        { color: expensePeriod === "monthly" ? colors.foreground : colors.mutedForeground },
                      ]}
                    >
                      Monthly
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.periodSwitchBtn,
                      expensePeriod === "yearly" && { backgroundColor: colors.card },
                    ]}
                    onPress={() => {
                      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                      setExpensePeriod("yearly");
                    }}
                    activeOpacity={0.8}
                  >
                    <Text
                      style={[
                        styles.periodSwitchText,
                        { color: expensePeriod === "yearly" ? colors.foreground : colors.mutedForeground },
                      ]}
                    >
                      Yearly
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              <Text style={[styles.largePriceText, { color: colors.foreground }]}>
                ${displayTotal.toFixed(2)}
              </Text>

              <View style={styles.walletFooterRow}>
                <View style={styles.walletBadge}>
                  <Ionicons name="trending-down" size={12} color={colors.monthly} />
                  <Text style={[styles.walletBadgeText, { color: colors.mutedForeground }]}>
                    {subscriptions.length} active services
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Calendar Section Header & Month Navigation */}
          <View style={styles.calendarHeaderSection}>
            <View style={styles.titleRow}>
              <Text style={[styles.bigTitleYear, { color: colors.foreground }]}>
                {activeMonthName}
                {showYear && (
                  <Text style={{ color: colors.mutedForeground }}>
                    {", " + activeYear}
                  </Text>
                )}
              </Text>
              
              <View style={styles.monthNavRow}>
                <TouchableOpacity
                  onPress={handlePrevMonth}
                  style={[styles.navButton, { backgroundColor: colors.secondary }]}
                  activeOpacity={0.7}
                >
                  <Feather name="chevron-left" size={16} color={colors.foreground} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleNextMonth}
                  style={[styles.navButton, { backgroundColor: colors.secondary }]}
                  activeOpacity={0.7}
                >
                  <Feather name="chevron-right" size={16} color={colors.foreground} />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.todayAndActionsRow}>
              <View>
                <Text style={[styles.todayLabelText, { color: colors.mutedForeground }]}>
                  Today
                </Text>
                <Text style={[styles.todayDateText, { color: colors.foreground }]}>
                  {formattedTodayString}
                </Text>
              </View>

              <View style={styles.actionButtonsContainer}>
                <TouchableOpacity
                  style={[styles.actionButton, { backgroundColor: colors.secondary }]}
                  onPress={handleAddSubscription}
                  activeOpacity={0.7}
                >
                  <Ionicons name="plus" size={14} color={colors.foreground} />
                  <Text style={[styles.actionButtonText, { color: colors.foreground }]}>Add Subscription</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.legendRow}>
            <View style={styles.legendItem}>
              <View style={[styles.dot, { backgroundColor: colors.yearly }]} />
              <Text style={[styles.legendText, { color: colors.mutedForeground }]}>
                Yearly
              </Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.dot, { backgroundColor: colors.monthly }]} />
              <Text style={[styles.legendText, { color: colors.mutedForeground }]}>
                Monthly
              </Text>
            </View>
          </View>

          {viewMode === "calendar" ? (
            <>
              <View style={styles.dayNamesRow}>
                {DAY_NAMES.map((n) => (
                  <View
                    key={n}
                    style={[
                      styles.dayNameCell,
                      { width: cellSize, backgroundColor: colors.cell },
                    ]}
                  >
                    <Text
                      style={[
                        styles.dayNameText,
                        { color: colors.mutedForeground },
                      ]}
                    >
                      {n}
                    </Text>
                  </View>
                ))}
              </View>

              <MonthCarouselHorizontal
                ref={scrollRef}
                months={months}
                subscriptions={subscriptions}
                colors={colors}
                cellSize={cellSize}
                cardHeight={cardHeight}
                cardWidth={contentWidth}
                onDayPress={handleDayPress}
                onMonthChange={handleMonthChange}
                currentMonthIndex={currentMonthIndex}
              />
            </>
          ) : (
            <ListView
              subscriptions={subscriptions}
              colors={colors}
              onSubPress={handleSubPress}
            />
          )}

          {/* Clean Analytics Section underneath Calendar */}
          <View style={styles.analyticsSection}>
            <Text style={[styles.analyticsHeaderTitle, { color: colors.mutedForeground }]}>
              ANALYTICS & BREAKDOWN
            </Text>
            <View style={[styles.analyticsCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <View style={styles.analyticsRow}>
                <View style={styles.analyticsInfo}>
                  <Text style={[styles.analyticsLabel, { color: colors.foreground }]}>Monthly Average</Text>
                  <Text style={[styles.analyticsSub, { color: colors.mutedForeground }]}>Based on active subscriptions</Text>
                </View>
                <Text style={[styles.analyticsValue, { color: colors.foreground }]}>
                  ${monthlyTotal.toFixed(2)}
                </Text>
              </View>
              <View style={[styles.rowDivider, { backgroundColor: colors.border }]} />
              <View style={styles.analyticsRow}>
                <View style={styles.analyticsInfo}>
                  <Text style={[styles.analyticsLabel, { color: colors.foreground }]}>Projected Yearly</Text>
                  <Text style={[styles.analyticsSub, { color: colors.mutedForeground }]}>Total annual run-rate</Text>
                </View>
                <Text style={[styles.analyticsValue, { color: colors.yearly }]}>
                  ${yearlyTotal.toFixed(2)}
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>

      <Modal
        visible={selectedDay !== null}
        transparent
        animationType="fade"
        onRequestClose={() => setSelectedDay(null)}
      >
        <TouchableWithoutFeedback onPress={() => setSelectedDay(null)}>
          <View style={[styles.overlay, { backgroundColor: colors.overlay }]}>
            <TouchableWithoutFeedback>
              <View style={styles.modalInner}>
                <View
                  style={[styles.totalPill, { backgroundColor: colors.pill }]}
                >
                  <Text
                    style={[styles.totalPillText, { color: colors.foreground }]}
                  >
                    TOTAL: ${dayTotal.toFixed(2)}
                  </Text>
                </View>

                <View
                  style={[styles.dayCard, { backgroundColor: colors.card }]}
                >
                  {selectedDaySubs.map((sub, i) => (
                    <React.Fragment key={sub.id}>
                      <TouchableOpacity
                        style={styles.dayRow}
                        onPress={() => handleSubPress(sub)}
                        activeOpacity={0.7}
                      >
                        <View style={{ width: 36, height: 36 }}>
                          <SubscriptionIcon
                            name={sub.name}
                            size={36}
                            src={sub.src}
                          />
                        </View>
                        <Text
                          style={[
                            styles.dayRowName,
                            { color: colors.foreground },
                          ]}
                        >
                          {sub.name}
                        </Text>
                        <Text
                          style={[
                            styles.dayRowPrice,
                            { color: colors.foreground },
                          ]}
                        >
                          ${sub.price.toFixed(2)}
                        </Text>
                      </TouchableOpacity>
                      {i < selectedDaySubs.length - 1 && (
                        <View
                          style={[
                            styles.rowDivider,
                            { backgroundColor: colors.border },
                          ]}
                        />
                      )}
                    </React.Fragment>
                  ))}
                  <Text
                    style={[styles.dayLabel, { color: colors.mutedForeground }]}
                  >
                    {selectedDay ? getDayLabel(selectedDay) : ""}
                  </Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </LinearGradient>
  );
}

interface MonthCarouselHorizontalProps {
  months: MonthMeta[];
  subscriptions: Subscription[];
  colors: ReturnType<typeof useColors>;
  cellSize: number;
  cardHeight: number;
  cardWidth: number;
  onDayPress: (day: number) => void;
  onMonthChange: (year: number, month: number) => void;
  currentMonthIndex: number;
}

const MonthCarouselHorizontal = React.forwardRef<ScrollView, MonthCarouselHorizontalProps>(
  function MonthCarouselHorizontal(
    {
      months,
      subscriptions,
      colors,
      cellSize,
      cardHeight,
      cardWidth,
      onDayPress,
      onMonthChange,
      currentMonthIndex,
    },
    ref
  ) {
    const handleMomentumEnd = useCallback(
      (e: NativeSyntheticEvent<NativeScrollEvent>) => {
        const x = e.nativeEvent.contentOffset.x;
        const index = Math.max(
          0,
          Math.min(months.length - 1, Math.round(x / cardWidth))
        );
        const m = months[index];
        if (m) onMonthChange(m.year, m.month);
      },
      [months, cardWidth, onMonthChange]
    );

    return (
      <View style={{ height: cardHeight }}>
        <ScrollView
          ref={ref}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          decelerationRate="fast"
          onMomentumScrollEnd={handleMomentumEnd}
          scrollEventThrottle={16}
        >
          {months.map((m) => {
            return (
              <View
                key={m.key}
                style={[
                  styles.cardPage,
                  {
                    width: cardWidth,
                    height: cardHeight,
                  },
                ]}
              >
                <MonthGrid
                  year={m.year}
                  month={m.month}
                  cellSize={cellSize}
                  subscriptions={subscriptions}
                  colors={colors}
                  onDayPress={onDayPress}
                />
              </View>
            );
          })}
        </ScrollView>
      </View>
    );
  }
);

interface MonthGridProps {
  year: number;
  month: number;
  cellSize: number;
  subscriptions: Subscription[];
  colors: ReturnType<typeof useColors>;
  onDayPress: (day: number) => void;
}

function MonthGrid({
  year,
  month,
  cellSize,
  subscriptions,
  colors,
  onDayPress,
}: MonthGridProps) {
  const cells = useMemo(() => buildMonthCells(year, month), [year, month]);

  return (
    <View
      style={[
        styles.grid,
        {
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "transparent",
        },
      ]}
    >
      {cells.map((day, i) => {
        const daySubs = day
          ? subscriptions.filter((s) => s.billingDay === day)
          : [];
        const first = daySubs[0];
        const extra = daySubs.length - 1;
        const hasYearly = daySubs.some((s) => s.period === "yearly");
        const dotColor = hasYearly ? colors.yearly : colors.monthly;

        return (
          <TouchableOpacity
            key={i}
            style={[
              styles.cell,
              {
                width: cellSize,
                height: cellSize,
                backgroundColor: colors.cell,
                opacity: day ? 1 : 0.7,
                borderRadius: 10,
                marginBottom: GAP,
                marginRight: (i + 1) % 7 === 0 ? 0 : GAP,
              },
            ]}
            onPress={() => day && onDayPress(day)}
            disabled={!day}
            activeOpacity={daySubs.length > 0 ? 0.75 : 1}
          >
            {day != null && (
              <>
                {first && (
                  <View
                    style={[styles.periodDot, { backgroundColor: dotColor }]}
                  />
                )}
                {first && (
                  <View style={styles.cellIconWrap}>
                    <SubscriptionIcon
                      src={first.src}
                      name={first.name}
                      size={Math.floor(cellSize * 0.6)}
                    />
                    {extra > 0 && (
                      <View
                        style={[
                          styles.badge,
                          {
                            backgroundColor: colors.secondary,
                            maxWidth: 32,
                            maxHeight: 32,
                            aspectRatio: 1,
                          },
                        ]}
                      >
                        <Text
                          style={[
                            styles.badgeText,
                            { color: colors.foreground },
                          ]}
                        >
                          +{extra}
                        </Text>
                      </View>
                    )}
                  </View>
                )}
                <Text style={[styles.cellDayNum, { color: colors.foreground }]}>
                  {day}
                </Text>
              </>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

interface ListProps {
  subscriptions: Subscription[];
  colors: ReturnType<typeof useColors>;
  onSubPress: (sub: Subscription) => void;
}

function ListView({ subscriptions, colors, onSubPress }: ListProps) {
  const grouped = useMemo(() => {
    const map: Record<number, Subscription[]> = {};
    for (const s of subscriptions) {
      if (!map[s.billingDay]) map[s.billingDay] = [];
      map[s.billingDay].push(s);
    }
    return Object.entries(map)
      .sort(([a], [b]) => Number(a) - Number(b))
      .map(([day, subs]) => ({ day: Number(day), subs }));
  }, [subscriptions]);

  return (
    <View style={styles.listWrap}>
      {grouped.map(({ day, subs }) => (
        <View key={day} style={styles.listGroup}>
          <Text
            style={[styles.listGroupHeader, { color: colors.mutedForeground }]}
          >
            {getDayLabel(day)}
          </Text>
          <View style={[styles.listCard, { backgroundColor: colors.card }]}>
            {subs.map((sub, i) => (
              <React.Fragment key={sub.id}>
                <TouchableOpacity
                  style={styles.listRow}
                  onPress={() => onSubPress(sub)}
                  activeOpacity={0.7}
                >
                  <View style={{ width: 40, height: 40 }}>
                    <SubscriptionIcon src={sub.src} name={sub.name} size={40} />
                  </View>
                  <View style={styles.listRowMid}>
                    <Text
                      style={[styles.listRowName, { color: colors.foreground }]}
                    >
                      {sub.name}
                    </Text>
                    <View
                      style={[
                        styles.periodChip,
                        {
                          backgroundColor:
                            sub.period === "monthly"
                              ? `${colors.monthly}22`
                              : `${colors.yearly}22`,
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.periodChipText,
                          {
                            color:
                              sub.period === "monthly"
                                ? colors.monthly
                                : colors.yearly,
                          },
                        ]}
                      >
                        {sub.period === "monthly" ? "Monthly" : "Yearly"}
                      </Text>
                    </View>
                  </View>
                  <Text
                    style={[styles.listRowPrice, { color: colors.foreground }]}
                  >
                    ${sub.price.toFixed(2)}
                  </Text>
                </TouchableOpacity>
                {i < subs.length - 1 && (
                  <View
                    style={[
                      styles.rowDivider,
                      { backgroundColor: colors.border },
                    ]}
                  />
                )}
              </React.Fragment>
            ))}
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, alignItems: "center" },
  contentWrap: { flex: 1, width: "100%", maxWidth: MAX_CONTENT_WIDTH },

  headerSection: {
    paddingHorizontal: H_PAD,
    marginBottom: 12,
  },
  calendarHeaderSection: {
    paddingHorizontal: H_PAD,
    marginBottom: 12,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  bigTitleYear: { ...Typography.h2 },
  
  monthNavRow: {
    flexDirection: "row",
    gap: 6,
  },
  navButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },

  todayAndActionsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  todayLabelText: { ...Typography.subtle, fontSize: 11, marginBottom: 2 },
  todayDateText: { ...Typography.body, fontSize: 15 },

  actionButtonsContainer: {
    flexDirection: "row",
    gap: 8,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 12,
    gap: 4,
  },
  actionButtonText: { ...Typography.subtle, fontSize: 12, fontWeight: "600" },

  largePriceCard: {
    borderRadius: 24,
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderWidth: 1,
  },
  walletHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  walletLabelGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  cardSubtitle: { ...Typography.subtle, fontSize: 13, textTransform: "capitalize" },
  
  periodSwitchContainer: {
    flexDirection: "row",
    borderRadius: 10,
    padding: 2,
    gap: 2,
  },
  periodSwitchBtn: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  periodSwitchText: { ...Typography.subtle, fontSize: 11, fontWeight: "600" },

  largePriceText: { ...Typography.h1, fontSize: 32, letterSpacing: -1.5, marginBottom: 8 },

  walletFooterRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  walletBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  walletBadgeText: { ...Typography.subtle, fontSize: 12 },

  analyticsSection: {
    paddingHorizontal: H_PAD,
    marginTop: 24,
  },
  analyticsHeaderTitle: {
    ...Typography.sectionHeader,
    fontSize: 11,
    fontWeight: "600",
    letterSpacing: 0.8,
    marginBottom: 8,
    marginLeft: 4,
  },
  analyticsCard: {
    borderRadius: 20,
    paddingVertical: 4,
    paddingHorizontal: 16,
    borderWidth: 1,
  },
  analyticsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
  },
  analyticsInfo: {
    gap: 2,
  },
  analyticsLabel: {
    ...Typography.body,
    fontSize: 15,
    fontWeight: "500",
  },
  analyticsSub: {
    ...Typography.subtle,
    fontSize: 12,
  },
  analyticsValue: {
    ...Typography.body,
    fontSize: 16,
    fontWeight: "600",
  },

  legendRow: {
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: H_PAD,
    marginBottom: 16,
  },
  legendItem: { flexDirection: "row", alignItems: "center", gap: 6 },
  dot: { width: 8, height: 8, borderRadius: 4 },
  legendText: { ...Typography.subtle },

  dayNamesRow: {
    flexDirection: "row",
    gap: GAP,
    paddingHorizontal: H_PAD,
    marginBottom: 8,
  },
  dayNameCell: { alignItems: "center", paddingVertical: 5, borderRadius: 10 },
  dayNameText: { ...Typography.subtle },

  cardPage: {
    paddingHorizontal: H_PAD,
    justifyContent: "center",
  },

  grid: { flexDirection: "row", flexWrap: "wrap" },
  cell: {
    alignItems: "center",
    justifyContent: "flex-end",
    position: "relative",
    flexDirection: "column",
    paddingBottom: 4,
    paddingLeft: 4,
    paddingRight: 4,
    paddingTop: 6,
    gap: 3,
  },
  cellIconWrap: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    flex: 1,
    aspectRatio: 1,
    maxWidth: 24,
  },
  periodDot: {
    position: "absolute",
    top: 5,
    right: 5,
    width: 6,
    height: 6,
    zIndex: 5,
    borderRadius: 3,
  },
  badge: {
    height: "100%",
    aspectRatio: 1,
    borderRadius: 20,
    zIndex: 3,
    marginLeft: -10,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: { ...Typography.subtle, fontSize: 10 },
  cellDayNum: { ...Typography.subtle, fontSize: 11, lineHeight: 12 },

  overlay: { flex: 1, alignItems: "center", justifyContent: "center" },
  modalInner: { alignItems: "center", gap: 10, width: "82%" },
  totalPill: { paddingHorizontal: 16, paddingVertical: 7, borderRadius: 20 },
  totalPillText: { ...Typography.pillLabel },
  dayCard: {
    width: "100%",
    borderRadius: 20,
    overflow: "hidden",
    paddingBottom: 10,
  },
  dayRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 13,
    gap: 12,
  },
  dayRowName: { flex: 1, ...Typography.body, fontSize: 16 },
  dayRowPrice: { ...Typography.body, fontSize: 16 },
  dayLabel: {
    textAlign: "center",
    ...Typography.subtle,
    letterSpacing: 0.6,
    marginTop: 6,
  },
  rowDivider: { height: StyleSheet.hairlineWidth, marginHorizontal: 8 },

  listWrap: { paddingHorizontal: H_PAD, gap: 20, marginTop: 4 },
  listGroup: { gap: 8 },
  listGroupHeader: { ...Typography.sectionHeader },
  listCard: { borderRadius: 16, overflow: "hidden" },
  listRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 12,
    gap: 12,
  },
  listRowMid: { flex: 1, gap: 4 },
  listRowName: { ...Typography.body },
  periodChip: {
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  periodChipText: { ...Typography.subtle },
  listRowPrice: { ...Typography.body },
});