import {
  HomeIcon,
  UsersIcon,
  BuildingStorefrontIcon,
  ShoppingCartIcon,
  ReceiptRefundIcon,
  ClipboardDocumentListIcon,
  BanknotesIcon,
  ReceiptPercentIcon,
  CogIcon,
  BeakerIcon,
  CalendarIcon,
  DocumentMagnifyingGlassIcon,
  CheckBadgeIcon,
  DocumentTextIcon,
  ScissorsIcon,
  ChartBarIcon,
  ChartPieIcon,
} from "@heroicons/vue/24/outline";

import { MenuTypes } from "../interface/SideBarType";

export const menuTypes: MenuTypes = {
  TR: [
    { name: "dashboard", defaultName: "대시보드", route: "/dashboard", icon: HomeIcon },
    { name: "members", defaultName: "회원 목록", route: "/members", icon: UsersIcon },
    { name: "warehouse", defaultName: "창고 목록", route: "/warehouse", icon: BuildingStorefrontIcon },
    { name: "purchaseRequest", defaultName: "구매 요청", route: "/purchase-request", icon: ShoppingCartIcon },
    { name: "purchaseHistory", defaultName: "구매 내역", route: "/purchase-history", icon: ReceiptRefundIcon },
    { name: "inventory", defaultName: "재고 목록", route: "/inventory", icon: ClipboardDocumentListIcon },
    { name: "salesRequest", defaultName: "판매 요청", route: "/sales-request", icon: BanknotesIcon },
    { name: "salesHistory", defaultName: "판매 내역", route: "/sales-history", icon: ReceiptPercentIcon },
  ],
  PH: [
    { name: "dashboard", defaultName: "대시보드", route: "/dashboard", icon: HomeIcon },
    { name: "members", defaultName: "회원 목록", route: "/members", icon: UsersIcon },
    {
      name: "uco",
      defaultName: "UCO",
      icon: CogIcon,
      children: [
        {
          name: "purchaseRequest",
          defaultName: "구매 요청",
          route: "/uco/purchase-request",
          icon: ShoppingCartIcon,
        },
        {
          name: "purchaseHistory",
          defaultName: "구매 내역",
          route: "/uco/purchase-history",
          icon: ReceiptRefundIcon,
        },
        {
          name: "inventory",
          defaultName: "재고 목록",
          route: "/uco/inventory",
          icon: ClipboardDocumentListIcon,
        },
      ],
    },
    {
      name: "tallow",
      defaultName: "Tallow",
      icon: BeakerIcon,
      children: [
        {
          name: "purchaseRequest",
          defaultName: "구매 요청",
          route: "/tallow/purchase-request",
          icon: ShoppingCartIcon,
        },
        {
          name: "purchaseHistory",
          defaultName: "구매 내역",
          route: "/tallow/purchase-history",
          icon: ReceiptRefundIcon,
        },
        {
          name: "localHistory",
          defaultName: "국산우지 내역",
          route: "/tallow/local-history",
          icon: ClipboardDocumentListIcon,
        },
      ],
    },
  ],
  PS: [
    { name: "dashboard", defaultName: "대시보드", route: "/dashboard", icon: HomeIcon },
    { name: "members", defaultName: "회원 목록", route: "/members", icon: UsersIcon },
    {
      name: "uco",
      defaultName: "UCO",
      icon: CogIcon,
      children: [
        {
          name: "purchaseRequest",
          defaultName: "구매 요청",
          route: "/uco/purchase-request",
          icon: ShoppingCartIcon,
        },
        {
          name: "purchaseHistory",
          defaultName: "구매 내역",
          route: "/uco/purchase-history",
          icon: ReceiptRefundIcon,
        },
        {
          name: "inventory",
          defaultName: "재고 목록",
          route: "/uco/inventory",
          icon: ClipboardDocumentListIcon,
        },
        { name: "calendar", defaultName: "재고 달력", route: "/uco/calendar", icon: CalendarIcon },
        {
          name: "ai",
          defaultName: "AI 인식",
          route: "/uco/ai",
          icon: DocumentMagnifyingGlassIcon,
        },
        {
          name: "certificationRequest",
          defaultName: "인증 요청",
          route: "/uco/certification-request",
          icon: CheckBadgeIcon,
        },
        {
          name: "certificationHistory",
          defaultName: "인증 내역",
          route: "/uco/certification-history",
          icon: ClipboardDocumentListIcon,
        },
        { name: "salesRequest", defaultName: "판매 요청", route: "/uco/sales-request", icon: BanknotesIcon },
        {
          name: "salesHistory",
          defaultName: "판매 내역",
          route: "/uco/sales-history",
          icon: ReceiptPercentIcon,
        },
      ],
    },
    {
      name: "tallow",
      defaultName: "Tallow",
      icon: BeakerIcon,
      children: [
        {
          name: "localFile",
          defaultName: "국산우지 파일",
          route: "/tallow/local-file",
          icon: DocumentTextIcon,
        },
        {
          name: "localHistory",
          defaultName: "국산우지 내역",
          route: "/tallow/local-history",
          icon: ClipboardDocumentListIcon,
        },
        {
          name: "localSales",
          defaultName: "국산우지 판매",
          route: "/tallow/local-sales",
          icon: BanknotesIcon,
        },
        {
          name: "salesRequest",
          defaultName: "판매 요청",
          route: "/tallow/sales-request",
          icon: BanknotesIcon,
        },
        {
          name: "salesHistory",
          defaultName: "판매 내역",
          route: "/tallow/sales-history",
          icon: ReceiptPercentIcon,
        },
      ],
    },
    {
      name: "fishFat",
      defaultName: "fish fat",
      icon: ScissorsIcon,
      children: [
        {
          name: "purchaseRequest",
          defaultName: "구매 요청",
          route: "/fishfat/purchase-request",
          icon: ShoppingCartIcon,
        },
        {
          name: "purchaseHistory",
          defaultName: "구매 내역",
          route: "/fishfat/purchase-history",
          icon: ReceiptRefundIcon,
        },
      ],
    },
    {
      name: "statistics",
      defaultName: "통계",
      icon: ChartBarIcon,
      children: [
        {
          name: "ucoDailyStats",
          defaultName: "UCO 일별 통계",
          route: "/uco/daily-stats",
          icon: ChartPieIcon,
        },
      ],
    },
  ],
  AU: [
    { name: "dashboard", defaultName: "대시보드", route: "/dashboard", icon: HomeIcon },
    { name: "members", defaultName: "회원 목록", route: "/members", icon: UsersIcon },
    {
      name: "certificationRequest",
      defaultName: "인증 요청",
      route: "/certification-request",
      icon: CheckBadgeIcon,
    },
    {
      name: "certificationHistory",
      defaultName: "인증 내역",
      route: "/certification-history",
      icon: ClipboardDocumentListIcon,
    },
  ],
  WH: [
    { name: "dashboard", defaultName: "대시보드", route: "/dashboard", icon: HomeIcon },
    { name: "members", defaultName: "회원 목록", route: "/members", icon: UsersIcon },
    { name: "warehouse", defaultName: "창고 목록", route: "/warehouse", icon: BuildingStorefrontIcon },
    { name: "purchaseHistory", defaultName: "구매 내역", route: "/purchase-history", icon: ReceiptRefundIcon },
    { name: "inventory", defaultName: "재고 목록", route: "/inventory", icon: ClipboardDocumentListIcon },
    { name: "ai", defaultName: "AI 인식", route: "/ai", icon: DocumentMagnifyingGlassIcon },
    { name: "salesRequest", defaultName: "판매 요청", route: "/sales-request", icon: BanknotesIcon },
    { name: "salesHistory", defaultName: "판매 내역", route: "/sales-history", icon: ReceiptPercentIcon },
    {
      name: "statistics",
      defaultName: "통계",
      icon: ChartBarIcon,
      children: [
        {
          name: "ucoDailyStats",
          defaultName: "UCO 일별 통계",
          route: "/uco/daily-stats",
          icon: ChartPieIcon,
        },
      ],
    },
  ],
};
