class CanvasPropertyIndex {
    constructor() { }
    
    //Some Properties to choose from:

    //Line Cap:
    static lineCap_butt = 'butt';
    static lineCap_round = 'round';
    static lineCap_square = 'square';

    //Line Join:
    static lineJoin_bevel = 'bevel';
    static lineJoin_round = 'round';
    static lineJoin_miter = 'miter';

    //Font Style
    static fontStyle_normal = 'normal';
    static fontStyle_italic = 'italic';
    static fontStyle_oblique = 'oblique';

    //Font Variant:
    static fontVariant_normal = 'normal';
    static fontVariant_small_caps = 'small-caps';

    //Font Weight:
    static fontWeight_normal = 'normal';
    static fontWeight_bold = 'bold';
    static fontWeight_bolder = 'bolder';
    static fontWeight_lighter = 'lighter';
    static fontWeight_300 = '300';
    static fontWeight_600 = '600';
    static fontWeight_900 = '900';

    //Font Size:
    static FontSize(Pixels) {
        return `${Pixels}px`;
    }

    //Font Family:
    static FontFamily_monospace = 'monospace';
    static FontFamily_serif = 'serif';
    static FontFamily_sans_serif = 'sans-serif';
    static FontFamily_cursive = 'cursive';
    static FontFamily_fantasy = 'fantasy';
    static FontFamily_Courier_New = 'Courier New';
    static FontFamily_Verdana = 'Verdana';
    static FontFamily_Arial = 'Arial';

    //Buld Font:
    static BuildFont(Family, Size, Weight, Variant, Style) {
        return `${Style} ${Variant} ${Weight} ${Size} ${Family}`;
    }

    //Text Alignment:
    static textAlign_start = 'start';
    static textAlign_end = 'end';
    static textAlign_center = 'center';
    static textAlign_left = 'left';
    static textAlign_right = 'right';

    //Text Baseline:
    static textBaseline_alphabetic = 'alphabetic';
    static textBaseline_top = 'top';
    static textBaseline_hanging = 'hanging	';
    static textBaseline_middle = 'middle';
    static textBaseline_ideographic = 'ideographic';
    static textBaseline_bottom = 'bottom';
}