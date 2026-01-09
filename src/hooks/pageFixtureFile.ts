
import { Page } from "@playwright/test";
import { Logger } from "winston";


export const pageFixtureVar = {
  //@ts-ignore
  page: undefined as Page,
  logger: undefined as Logger
};
