import { Box, Header, Text, Icon } from "@adminjs/design-system";

const StatsBox = ({ label, data, link, icon, bg, color }) => {
    function onClickToBox() {
        window.location.href = link;
    }

    return (
        <Box
            color={color}
            bg={bg}
            width={[1, 1 / 2, 1 / 3, 1 / 4]} // responsive width
            padding="1rem"
            margin="1.5rem" // default margin
        >
            <div onClick={onClickToBox} style={{ cursor: "pointer" }}>
                <Header.H4
                    marginTop="1rem"
                    marginBottom="1rem"
                    textAlign="center"
                >
                    {label}
                </Header.H4>
                <Text
                    fontSize="3rem"
                    lineHeight="3rem"
                    fontWeight="bold"
                    textAlign="center"
                >
                    {data}
                </Text>
            </div>
        </Box>
    );
};

export default StatsBox;
