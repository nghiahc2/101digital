interface PanelHeaderProps {
  text: string;
  style?: any;
}
const PanelHeader: React.FC<PanelHeaderProps> = ({ text, style }) => {
  return (
    <span style={{ fontWeight: "bold", fontSize: 15, ...style }}>{text}</span>
  );
};

export default PanelHeader;
