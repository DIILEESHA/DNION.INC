// schemas/testimonial.js

import { defineField, defineType } from 'sanity'

export default {
    name: 'testimonial',
    title: 'Testimonial',
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'Client Name',
            type: 'string',
            validation: Rule => Rule.required(),
        },
        {
            name: 'image',
            title: 'Client Image',
            type: 'image',
            options: {
                hotspot: true,
            },
        },
        {
            name: 'review',
            title: 'Review',
            type: 'text',
            rows: 4,
            validation: Rule => Rule.required(),
        },
    ],
};
