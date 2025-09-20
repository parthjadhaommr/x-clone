import { Stack } from "expo-router";
import "../global.css";
import { ClerkProvider, useUser } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";

function RootNavigator() {
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) {
    return null; // or splash screen
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {isSignedIn ? (
        <Stack.Screen name="(tabs)" />
      ) : (
        <Stack.Screen name="(auth)" />
      )}
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <ClerkProvider tokenCache={tokenCache}>
      <RootNavigator />
    </ClerkProvider>
  );
}
