import {defineField, defineType} from 'sanity'

export default defineType({
  name: "aboutus",
  title: "About Us",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: Rule => Rule.required()
    }),
    defineField({
      name: "description",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H2', value: 'h2'},
            {title: 'H3', value: 'h3'},
            {title: 'Quote', value: 'blockquote'}
          ],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
              {title: 'Underline', value: 'underline'},
              {title: 'Strike-through', value: 'strike-through'},
              {title: 'Code', value: 'code'}
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'External Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                    validation: Rule => Rule.uri({
                      scheme: ['http', 'https', 'mailto', 'tel']
                    })
                  }
                ]
              },
              
            ]
          }
        },
        {
          type: "image",
          options: {hotspot: true},
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alternative Text",
              validation: Rule => Rule.required()
            },
            {
              name: "caption",
              type: "string",
              title: "Caption"
            }
          ]
        }
      ],
      validation: Rule => Rule.required().min(1)
    })
  ]
})
