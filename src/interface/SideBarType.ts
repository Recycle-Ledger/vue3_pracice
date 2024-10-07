import { Component } from "vue"; // Vue 컴포넌트 타입

export interface MenuItem {
  name: string;
  route?: string;
  icon: Component;
  children?: MenuItem[];
}

export interface MenuTypes {
  [key: string]: MenuItem[];
}
