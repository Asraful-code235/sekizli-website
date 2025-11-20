import { type SchemaTypeDefinition } from "sanity";

import { blockContentType } from "./blockContentType";
import { categoryType } from "./categoryType";
import { postType } from "./postType";
import { authorType } from "./authorType";
import { headerType } from "../components/documents/headerType";
import { footerType } from "../components/documents/footerType";
import { themeType } from "../components/documents/themeType";
import { pageDocumentType } from "../components/documents/pageDocumentType";
import { heroSectionType } from "../components/sections/heroSectionType";
import { categorySectionType } from "../components/sections/categorySectionType";
import { aboutSectionType } from "../components/sections/aboutSectionType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContentType,
    categoryType,
    postType,
    authorType,
    headerType,
    footerType,
    themeType,
    pageDocumentType,
    heroSectionType,
    categorySectionType,
    aboutSectionType,
  ],
};
