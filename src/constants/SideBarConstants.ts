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
    { name: "대시보드", route: "/dashboard", icon: HomeIcon },
    { name: "회원 목록", route: "/members", icon: UsersIcon },
    { name: "창고 목록", route: "/warehouse", icon: BuildingStorefrontIcon },
    { name: "구매 요청", route: "/purchase-request", icon: ShoppingCartIcon },
    { name: "구매 내역", route: "/purchase-history", icon: ReceiptRefundIcon },
    { name: "재고 목록", route: "/inventory", icon: ClipboardDocumentListIcon },
    { name: "판매 요청", route: "/sales-request", icon: BanknotesIcon },
    { name: "판매 내역", route: "/sales-history", icon: ReceiptPercentIcon },
  ],
  PH: [
    { name: "대시보드", route: "/dashboard", icon: HomeIcon },
    { name: "회원 목록", route: "/members", icon: UsersIcon },
    {
      name: "UCO",
      icon: CogIcon,
      children: [
        {
          name: "구매 요청",
          route: "/uco/purchase-request",
          icon: ShoppingCartIcon,
        },
        {
          name: "구매 내역",
          route: "/uco/purchase-history",
          icon: ReceiptRefundIcon,
        },
        {
          name: "재고 목록",
          route: "/uco/inventory",
          icon: ClipboardDocumentListIcon,
        },
      ],
    },
    {
      name: "Tallow",
      icon: BeakerIcon,
      children: [
        {
          name: "구매 요청",
          route: "/tallow/purchase-request",
          icon: ShoppingCartIcon,
        },
        {
          name: "구매 내역",
          route: "/tallow/purchase-history",
          icon: ReceiptRefundIcon,
        },
        {
          name: "국산우지 내역",
          route: "/tallow/local-history",
          icon: ClipboardDocumentListIcon,
        },
      ],
    },
  ],
  PS: [
    { name: "대시보드", route: "/dashboard", icon: HomeIcon },
    { name: "회원 목록", route: "/members", icon: UsersIcon },
    {
      name: "UCO",
      icon: CogIcon,
      children: [
        {
          name: "구매 요청",
          route: "/uco/purchase-request",
          icon: ShoppingCartIcon,
        },
        {
          name: "구매 내역",
          route: "/uco/purchase-history",
          icon: ReceiptRefundIcon,
        },
        {
          name: "재고 목록",
          route: "/uco/inventory",
          icon: ClipboardDocumentListIcon,
        },
        { name: "재고 달력", route: "/uco/calendar", icon: CalendarIcon },
        {
          name: "AI 인식",
          route: "/uco/ai",
          icon: DocumentMagnifyingGlassIcon,
        },
        {
          name: "인증 요청",
          route: "/uco/certification-request",
          icon: CheckBadgeIcon,
        },
        {
          name: "인증 내역",
          route: "/uco/certification-history",
          icon: ClipboardDocumentListIcon,
        },
        { name: "판매 요청", route: "/uco/sales-request", icon: BanknotesIcon },
        {
          name: "판매 내역",
          route: "/uco/sales-history",
          icon: ReceiptPercentIcon,
        },
      ],
    },
    {
      name: "Tallow",
      icon: BeakerIcon,
      children: [
        {
          name: "국산우지 파일",
          route: "/tallow/local-file",
          icon: DocumentTextIcon,
        },
        {
          name: "국산우지 내역",
          route: "/tallow/local-history",
          icon: ClipboardDocumentListIcon,
        },
        {
          name: "국산우지 판매",
          route: "/tallow/local-sales",
          icon: BanknotesIcon,
        },
        {
          name: "판매 요청",
          route: "/tallow/sales-request",
          icon: BanknotesIcon,
        },
        {
          name: "판매 내역",
          route: "/tallow/sales-history",
          icon: ReceiptPercentIcon,
        },
      ],
    },
    {
      name: "fish fat",
      icon: ScissorsIcon,
      children: [
        {
          name: "구매 요청",
          route: "/fishfat/purchase-request",
          icon: ShoppingCartIcon,
        },
        {
          name: "구매 내역",
          route: "/fishfat/purchase-history",
          icon: ReceiptRefundIcon,
        },
      ],
    },
    {
      name: "Statistics",
      icon: ChartBarIcon,
      children: [
        {
          name: "UCO 일별 통계",
          route: "/uco/daily-stats",
          icon: ChartPieIcon,
        },
      ],
    },
  ],
  AU: [
    { name: "대시보드", route: "/dashboard", icon: HomeIcon },
    { name: "회원 목록", route: "/members", icon: UsersIcon },
    {
      name: "인증 요청",
      route: "/certification-request",
      icon: CheckBadgeIcon,
    },
    {
      name: "인증 내역",
      route: "/certification-history",
      icon: ClipboardDocumentListIcon,
    },
  ],
  WH: [
    { name: "대시보드", route: "/dashboard", icon: HomeIcon },
    { name: "회원 목록", route: "/members", icon: UsersIcon },
    { name: "창고 목록", route: "/warehouse", icon: BuildingStorefrontIcon },
    { name: "구매 내역", route: "/purchase-history", icon: ReceiptRefundIcon },
    { name: "재고 목록", route: "/inventory", icon: ClipboardDocumentListIcon },
    { name: "AI 인식", route: "/ai", icon: DocumentMagnifyingGlassIcon },
    { name: "판매 요청", route: "/sales-request", icon: BanknotesIcon },
    { name: "판매 내역", route: "/sales-history", icon: ReceiptPercentIcon },
    {
      name: "Statistics",
      icon: ChartBarIcon,
      children: [
        {
          name: "UCO 일별 통계",
          route: "/uco/daily-stats",
          icon: ChartPieIcon,
        },
      ],
    },
  ],
};
