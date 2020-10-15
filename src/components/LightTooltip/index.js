import {withStyles} from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";


const LightTooltip = withStyles((theme) => ({
    tooltip: {
        backgroundColor: '#fffeff',
        color: '#72839c',
        fontSize: 16,
        fontFamily: 'Source Sans Pro',
        boxShadow: '0px 4px 25px rgba(51, 102, 255, 0.15)',
        lineHeight: 1,
        paddingBottom: 6,
    },
}))(Tooltip);

export default LightTooltip;