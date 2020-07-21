import Knex from 'knex'

export async function seed(knex: Knex) {
    await knex('item').insert([
        {
            title: 'Lampâdas',
            image: 'lampadas.svg'
        },
        {
            title: 'Pilhas e Baterias',
            image: 'baterias.svg'
        },
        {
            title: 'Papéis e Papelão',
            image: 'papeis-papelao.svg'
        },
        {
            title: 'Resíduos Eletrônicos',
            image: 'eletronicos.svg'
        },
        {
            title: 'Resíduos Orgânicos',
            image: 'organicos.svg'
        },
        {
            title: 'Óleo de Cozinha',
            image: 'oleo.svg'
        }
    ])
}