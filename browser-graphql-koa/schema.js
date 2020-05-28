const { buildSchema } = require('graphql')

const mockData = [
    {
        id: 1,
        name: 'doudou',
        content: 'I like cake ~~!',
        praiseNum: 10
    },
    {
        id: 2,
        name: 'LN',
        content: 'I like iceCream ~~!',
        praiseNum: 5
    },
    {
        id: 3,
        name: 'DK',
        content: 'I like porridge ~~!',
        praiseNum: 5
    }
]

const schema = buildSchema(`
    type Comment {
        id: Int,
        name: String,
        content: String
        praiseNum: Int
    }

    type Query {
        comment: [Comment]
    }

    type Mutation {
        praise(id: Int) : Int
    }
`)

schema.getQueryType().getFields().comment.resolve = () => {
    return mockData
}

schema.getMutationType().getFields().praise.resolve = (arg0, { id }) => {
    let data = mockData.filter(item => item.id === id)
    data[0].praiseNum++
    return data[0].praiseNum
}

module.exports = schema
