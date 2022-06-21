module.exports = {
    sourceType: 'script',
    presets: [
        [
            '@babel/preset-env',
            {
                useBuiltIns: 'usage',
                corejs: 3
            },
        ],
        [
            '@babel/preset-react'
        ],
        [
            '@babel/preset-typescript',
            {
                'allowNameSpaces': true
            }
        ]
    ],
    plugins: [
        [
            '@babel/plugin-transform-runtime',
            { corejs: 3 }
        ],
        '@babel/plugin-proposal-export-default-from',
        '@babel/plugin-transform-arrow-functions',
        '@babel/proposal-class-properties',
        '@babel/proposal-object-rest-spread'
    ]
};