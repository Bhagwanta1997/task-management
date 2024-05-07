import { Button } from "@mui/material";

import { TypographyStyles } from "../styles/typography";

const UIButton = ({
    label,
    onClick,
    disabled,
    color
}) => {
    return <Button 
        variant="contained" 
        onClick={onClick}
        sx={{ ...TypographyStyles.Mulish.btnText, textTransform: 'capitalize', width: '100px'}}
        color={color}
        disabled={disabled}
    >
        {label}
    </Button>
}

export default UIButton;