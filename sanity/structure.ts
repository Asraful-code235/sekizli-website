import type { StructureResolver } from "sanity/structure";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Site Configuration")
        .child(
          S.list()
            .title("Configuration")
            .items([
              S.listItem()
                .title("Theme Settings")
                .id("theme")
                .child(
                  S.document()
                    .schemaType("theme")
                    .documentId("theme")
                    .title("Theme Settings")
                ),
              S.divider(),
              S.documentTypeListItem("header").title(
                "Headers (Multi-language)"
              ),
              S.documentTypeListItem("footer").title(
                "Footers (Multi-language)"
              ),
            ])
        ),
      S.divider(),
      // Pages Section
      S.listItem()
        .title("Pages")
        .child(
          S.list()
            .title("Pages")
            .items([
              S.listItem()
                .title("Homepage")
                .child(
                  S.documentList()
                    .title("Homepage Versions")
                    .filter('_type == "page" && pageKey == "homepage"')
                    .defaultOrdering([{ field: "language", direction: "asc" }])
                ),
              // Add more page types here as needed
              // S.listItem()
              //   .title('About')
              //   .child(
              //     S.documentList()
              //       .title('About Page Versions')
              //       .filter('_type == "page" && pageKey == "about"')
              //   ),
            ])
        ),
      S.divider(),
      S.documentTypeListItem("post").title("Posts"),
      S.documentTypeListItem("category").title("Categories"),
      S.documentTypeListItem("author").title("Authors"),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) =>
          item.getId() &&
          ![
            "post",
            "category",
            "author",
            "header",
            "footer",
            "theme",
            "page",
          ].includes(item.getId()!)
      ),
    ]);
