import { useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

export const useMobile = () => useMediaQuery(`(max-width: ${useMantineTheme().breakpoints.sm}px)`)
