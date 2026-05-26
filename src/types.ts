/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface NavItem {
  label: string;
  href: string;
  hasDropdown?: boolean;
}

export interface Partner {
  name: string;
  logoUrl?: string;
  website?: string;
}

export interface StatModel {
  value: string;
  indexCode: string;
  label: string;
  isRedTheme?: boolean;
}

export interface ContactData {
  name: string;
  email: string;
  company: string;
  projectDescription: string;
}
