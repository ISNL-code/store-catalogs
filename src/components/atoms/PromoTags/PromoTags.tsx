import { Box, Typography } from '@mui/material';
import { Colors } from 'constants/colors';
import { useOutletContext } from 'react-router-dom';
import { ViewModeType } from 'store_constants/types';
import { CatalogContextInterface } from 'types/outlet_context_models';

const PromoTags = ({ value, action = () => {}, disabled = false, code, adaptive = false }) => {
    const { viewMode }: CatalogContextInterface = useOutletContext();

    const generateBorderStyle = (
        color,
        gradientColor1,
        gradientColor2,
        borderGradientColor1,
        borderGradientColor2
    ) => ({
        border: viewMode === ViewModeType?.grid_m && adaptive ? `1px solid ${color}` : `1px solid ${color}`,
        background: `linear-gradient(135deg, ${gradientColor1} 50%, ${gradientColor2}) padding-box, 
                     linear-gradient(90deg, ${borderGradientColor1} 60%, ${borderGradientColor2}) border-box`,
        fontSize: code.includes('%') ? 12 : undefined,
    });

    const getStyles = () => {
        switch (code.toLowerCase()) {
            case 'new':
                return generateBorderStyle('#35b60d', '#268609', '#baddb0', '#0d6e0ddc', '#87ce7d');
            case 'top':
                return generateBorderStyle('#b6590d', '#f08710', '#e9ddcf', '#df7127dc', '#f5d3b8');
            case 'winter':
                return generateBorderStyle('#0084d1', '#3975f7', '#e9cfcf', '#084c99dc', '#b8d0f5');
            case 'autumn':
                return generateBorderStyle('#dbd06d', '#e2ad1a', '#f5b8b8', '#997e08dc', '#eaf5b8');
            case 'spring':
                return generateBorderStyle('#46b406', '#53bb17', '#b0dba1', '#216606dc', '#8ee079');
            case 'sale':
                return generateBorderStyle('#da0e0e', '#da0e0e', '#f7cdcd', '#ff6767dc', '#c45d5d');
            default:
                return generateBorderStyle('#b60dae', '#b60dae', '#cfd2e9', '#b60dae', '#b8bcf5');
        }
    };

    const getTextColor = () => {
        switch (code.toLowerCase()) {
            case 'new':
                return Colors?.WHITE;
            case 'top':
                return Colors?.WHITE;
            case 'winter':
                return Colors?.WHITE;
            case 'autumn':
                return Colors?.WHITE;
            case 'spring':
                return Colors?.WHITE;
            case 'sale':
                return Colors?.WHITE;
            default:
                return Colors?.WHITE;
        }
    };

    return (
        <Box
            px={viewMode === ViewModeType?.grid_m && adaptive ? 0.25 : 0.35}
            py={1}
            sx={{
                height: viewMode === ViewModeType?.grid_m && adaptive ? 18 : 25,
                maxWidth: viewMode === ViewModeType?.grid_m && adaptive ? 55 : 75,
                minWidth: viewMode === ViewModeType?.grid_m && adaptive ? 50 : 70,
                borderRadius: 3,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                lineHeight: 1,
                cursor: disabled ? 'default' : 'pointer',
                ...getStyles(),
            }}
            onClick={!disabled ? action : undefined}
        >
            <Typography
                sx={{
                    color: getTextColor(),
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    fontSize: viewMode === ViewModeType?.grid_m && adaptive ? 9 : 10,
                    cursor: 'default',
                    fontWeight: 700,
                    lineHeight: 1,
                    letterSpacing: 0.01,
                }}
            >
                {value || '----'}
            </Typography>
        </Box>
    );
};

export default PromoTags;
