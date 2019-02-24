import React from "react"
import CalculatorForm from '../components/CalculatorForm'

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={[`calculator`, `design`, `app`, `application`, `meetings`, `meeting`, `cost analysis`, `react`]} />

    <CalculatorForm />

  </Layout>
)

export default IndexPage
