import { Typography } from "@mui/material";
import { Box } from "@mui/system";

import { TypographyStyles } from "../styles/typography";

const UIInput = ({
    label,
    type,
    value,
    onChange
}) => {

    const renderInput = (type) => {
        switch (type) {
            case 'text':
                return <input className="input" type="text" value={value} onChange={onChange} style={inputStyles.text}/> 
            case 'date': 
                return <input className="input" type="date" value={value} onChange={onChange} style={inputStyles.date}/>              
            default:
                break;
        }
    }
    return <Box>
        <Typography>{label}</Typography>
        {renderInput(type)}
    </Box>
}

const inputStyles = {
    text: {
        height: '40px',
        width: '200px',
        borderRadius: '5px',
        padding: '5px',
        ...TypographyStyles.Mulish.title
    },
    date: {
        height: '40px',
        width: '200px',
        borderRadius: '5px',
        padding: '5px'
    }
}
export default UIInput;