import React from 'react'
import NewsLetterCard from './NewsLetterCard'

describe('<NewsLetterCard />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<NewsLetterCard />)
  })
})