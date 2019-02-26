import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"
import "./layout.scss"

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <div>
        <main style={{
          display: `flex`,
          alignItems: `center`,
          justifyContent: `center`,
          height: `100vh`
        }}>

          {children}

        </main>

        <footer style={{
          position: `fixed`,
          bottom: `16px`,
          left: `16px`,
          opacity: `.60`
        }} className="ds-caption-text-style">
          Built by <a href="https://oskrhq.com/" rel="noopener noreferrer" target="_blank">Oscar Gonzalez</a>
        </footer>

      </div>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
