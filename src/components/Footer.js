import React from "react"

function Footer() {
  return (
    <div>
      <p className="calculator-disclaimer-text">
        * These are estimates based on average salaries according to{" "}
        <a
          href="https://www.levels.fyi/"
          target="_blank"
          rel="noopener noreferrer"
        >
          levels.fyi
        </a>{" "}
        and do not reflect the{" "}
        <a
          href="https://en.wikipedia.org/wiki/Opportunity_cost"
          target="_blank"
          rel="noopener noreferrer"
        >
          opportunity costs
        </a>{" "}
        incurred by attending each meeting or other variables. For recreational
        purposes only and should not be used to discourage meetings but rather
        to be mindful of their purpose and other people’s time. <br />
        <span role="img" aria-labelledby="money">
          ⏰ = 💵
        </span>{" "}
        and the users we design for end up paying for it one way or another.
      </p>

      <p className="calculator-disclaimer-text">
        Built by{" "}
        <a href="https://oskrhq.com/" rel="noopener noreferrer" target="_blank">
          Oscar Gonzalez
        </a>{" "}
        using{" "}
        <a
          href="https://lovely-guide.surge.sh/"
          target="_blank"
          rel="noopener noreferrer"
        >
          OSKRHQ.DS
        </a>
        .
      </p>
    </div>
  )
}

export default Footer
