const { default: styled } = require("@emotion/styled");
const { Box } = require("@mui/material");



const FlexBetween = styled(Box)({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
})


export default FlexBetween

/*In the provided code, FlexBetween is a styled component created using Emotion. It extends the Box component from Material-UI (@mui/material). This means that FlexBetween is a Box component with custom styling applied.

Here's a breakdown of what FlexBetween does:

It uses the styled function from Emotion to create a styled component.
It takes Box as the base component to be styled.
The style object provided to styled is an object with CSS properties. In this case, it sets the display to flex, justifyContent to space-between, and alignItems to center. */