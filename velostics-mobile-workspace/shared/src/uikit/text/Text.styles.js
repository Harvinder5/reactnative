import styled, { css } from 'styled-components/native';

const PRIMARY = 'primary';
const PRIMARY_SEMIBOLD = 'primarySemiBold';
const PRIMARY_BOLD = 'primaryBold';
const PRIMARY_MEDIUM = 'primaryMedium';
const PRIMARY_HEAVY = 'primaryHeavy';
// const PRIMARY_LIGHT = 'primaryLight';

const SECONDARY = 'secondary';
const SECONDARY_SEMIBOLD = 'secondarySemiBold';
const SECONDARY_BOLD = 'secondaryBold';
const SECONDARY_LIGHT = 'secondaryLight';

const getFont = fontType => {
  switch (fontType) {
    case PRIMARY:
      return 'SF-PRO-TEXT-REGULAR';
    case PRIMARY_MEDIUM:
      return 'SF-PRO-TEXT-MEDIUM';
    case PRIMARY_SEMIBOLD:
      return 'SF-PRO-TEXT-SEMIBOLD';
    case PRIMARY_BOLD:
      return 'SF-PRO-TEXT-BOLD';
    case PRIMARY_HEAVY:
      return 'SF-PRO-TEXT-HEAVY';
    case SECONDARY:
      return 'S-PRO-REGULAR';
    case SECONDARY_LIGHT:
      return 'S-PRO-LIGHT';
    case SECONDARY_SEMIBOLD:
      return 'S-PRO-SEMIBOLD';
    case SECONDARY_BOLD:
      return 'S-PRO-BOLD';
    default:
      return 'SF-PRO-TEXT-REGULAR';
  }
};
export const FormattedText = styled.Text`
  font-weight: normal;
  margin: 0;
  font-family: SF-PRO-TEXT-REGULAR;
  color: ${props => props.theme.colors.darkText[0]}
    ${({ h1 }) =>
      h1 &&
      css`
        font-size: ${props => props.theme.fontSize.h1};
      `}
    ${({ h1 }) =>
      h1 &&
      css`
        font-size: ${props => props.theme.fontSize.h1};
        font-family: S-PRO-SEMIBOLD;
      `}
    ${({ h2 }) =>
      h2 &&
      css`
        font-size: ${props => props.theme.fontSize.h2};
        font-family: S-PRO-SEMIBOLD;
      `}
    ${({ h3 }) =>
      h3 &&
      css`
        font-size: ${props => props.theme.fontSize.h3};
        font-family: S-PRO-SEMIBOLD;
      `}
    ${({ h4 }) =>
      h4 &&
      css`
        font-size: ${props => props.theme.fontSize.h4};
      `}
    ${({ h5 }) =>
      h5 &&
      css`
        font-size: ${props => props.theme.fontSize.h5};
      `}
    ${({ h6 }) =>
      h6 &&
      css`
        font-size: ${props => props.theme.fontSize.h6};
      `};
    ${({ h7 }) =>
      h7 &&
      css`
        font-size: ${props => props.theme.fontSize.h7};
      `};
    ${({ white }) =>
      white &&
      css`
        color: ${props => props.theme.colors.white[0]};
      `}
    ${({ grey }) =>
      grey &&
      css`
        color: ${props => props.theme.colors.greyText[0]};
      `}
    
    ${({ lightPrimary }) =>
      lightPrimary &&
      css`
        color: ${props => props.theme.colors.primary[1]};
      `}
    ${({ lightPrimaryDark }) =>
      lightPrimaryDark &&
      css`
        color: ${props => props.theme.colors.primary[2]};
      `}
    ${({ lighter }) =>
      lighter &&
      css`
        font-weight: 400;
      `}
    ${({ bold }) =>
      bold &&
      css`
        font-weight: bold;
        font-family: SF-PRO-TEXT-BOLD;
      `}
    ${({ semiBold }) =>
      semiBold &&
      css`
        font-family: S-PRO-SEMIBOLD;
      `}
    ${({ bolder }) =>
      bolder &&
      css`
        font-weight: bolder;
      `}
    ${({ italic }) =>
      italic &&
      css`
        font-style: italic;
      `}
   
    ${({ color, colorIndex = 0 }) =>
      color &&
      css`
        color: ${props => props.theme.colors[color][colorIndex]};
      `}
    ${({ center }) =>
      center &&
      css`
        text-align: center;
      `}
    ${({ size }) =>
      size &&
      css`
        font-size: ${props => props.theme.fontSize[props.size]};
      `}
    ${({ marginVertical }) =>
      marginVertical &&
      css`
        margin-top: ${props => props.marginVertical}px;
        margin-bottom: ${props => props.marginVertical}px;
      `}
    ${({ margin }) =>
      margin &&
      css`
        margin: ${props => props.margin};
      `}
    ${({ font }) =>
      font &&
      css`
        font-family: ${props => getFont(props.font)};
      `}
    ${({ spacing }) =>
      spacing &&
      css`
        letter-spacing: ${props => props.spacing};
      `}
    ${({ textTransform }) =>
      textTransform &&
      css`
        text-transform: ${props => props.textTransform};
      `}
`;

export const StyledPrice = styled(FormattedText)`
  color: ${props => props.theme.colors.secondary[0]};
  font-size: ${props =>
    props.size ? props.theme.fontSize[props.size] : props.theme.fontSize.h4}rem;
  padding: 0px 5px;
  font-weight: 500;
  ${({ discount }) =>
    discount &&
    css`
      text-decoration: line-through;
      font-size: ${props =>
        props.size
          ? props.theme.fontSize[props.size]
          : props.theme.fontSize.h4}rem;
      color: darkgray;
      font-weight: normal;
    `}
  ${({ white }) =>
    white &&
    css`
      color: ${props => props.theme.colors.white[0]};
    `}
`;
export const StyledNumberTextContainer = styled.View`
  padding: 3px;
  height: 20px;
  width: 20px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.colors.darkText[1]};
  ${({ checked }) =>
    checked &&
    css`
      background-color: ${props => props.theme.colors.primary[0]};
    `}
`;
export const StyledNumberText = styled.Text`
  color: ${props => props.theme.colors.white[0]};
  font-family: SF-PRO-TEXT-SEMIBOLD;
  font-size: ${props => props.theme.fontSize.h66};
`;
export const s = 1;
