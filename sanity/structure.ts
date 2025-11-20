import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Site Configuration')
        .child(
          S.list()
            .title('Configuration')
            .items([
              S.listItem()
                .title('Theme Settings')
                .id('theme')
                .child(
                  S.document()
                    .schemaType('theme')
                    .documentId('theme')
                    .title('Theme Settings')
                ),
              S.divider(),
              S.documentTypeListItem('header').title('Headers (Multi-language)'),
              S.documentTypeListItem('footer').title('Footers (Multi-language)'),
            ])
        ),
      S.divider(),
      S.documentTypeListItem('post').title('Posts'),
      S.documentTypeListItem('category').title('Categories'),
      S.documentTypeListItem('author').title('Authors'),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() && !['post', 'category', 'author', 'header', 'footer', 'theme'].includes(item.getId()!),
      ),
    ])
