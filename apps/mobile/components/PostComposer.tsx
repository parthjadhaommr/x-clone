import { useCreatePost } from "@/hooks/useCreatePost";
import { useUser } from "@clerk/clerk-react";
import { Feather } from "@expo/vector-icons";
<<<<<<< Updated upstream
import { View, Text, Image, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
=======
import {
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    StyleSheet,
} from "react-native";
>>>>>>> Stashed changes

const PostComposer = () => {
    const {
        content,
        setContent,
        selectedImage,
        isCreating,
        pickImageFromGallery,
        takePhoto,
        removeImage,
        createPost,
    } = useCreatePost();

    const { user } = useUser();

    return (
<<<<<<< Updated upstream
        <View className="border-b border-gray-100 p-4 bg-white">
            <View className="flex-row items-center">
                {/* bug not rendering */}
                <Image source={{ uri: user?.imageUrl }}
                    style={{
                        height: 35,
                        width: 35,
                        borderRadius: 100
                    }}
                />
                <Text>{user?.username}</Text>
                <View className="flex-1">
                    <TextInput
                        className="text-gray-900 text-lg"
=======
        <View style={styles.container}>
            <View style={styles.row}>
                <Image
                    source={{ uri: user?.imageUrl }}
                    style={styles.profileImage}
                />
                <Text style={styles.username}>{user?.username}</Text>

                <View style={styles.inputWrapper}>
                    <TextInput
                        style={styles.textInput}
>>>>>>> Stashed changes
                        placeholder="What's happening?"
                        placeholderTextColor="#657786"
                        multiline
                        value={content}
                        onChangeText={setContent}
                        maxLength={280}
                    />
                </View>
            </View>

            {selectedImage && (
<<<<<<< Updated upstream
                <View
                    style={{
                        marginTop: 12, // mt-3
                        width: "100%",  // w-full
                        height: 192,    // h-48 (48 * 4 = 192px)
                        position: "relative",
                    }}
                >
                    <Image
                        source={{ uri: selectedImage }}
                        style={{
                            width: "100%",       // w-full
                            height: "100%",      // h-full
                            borderRadius: 16,    // rounded-2xl
                        }}
=======
                <View style={styles.selectedImageWrapper}>
                    <Image
                        source={{ uri: selectedImage }}
                        style={styles.selectedImage}
>>>>>>> Stashed changes
                        resizeMode="cover"
                    />
                    <TouchableOpacity
                        onPress={removeImage}
<<<<<<< Updated upstream
                        style={{
                            position: "absolute",
                            top: 8,              // top-2
                            right: 8,            // right-2
                            width: 32,           // w-8
                            height: 32,          // h-8
                            backgroundColor: "rgba(0,0,0,0.6)", // bg-black/60
                            borderRadius: 16,    // rounded-full
                            alignItems: "center",
                            justifyContent: "center",
                        }}
=======
                        style={styles.removeButton}
>>>>>>> Stashed changes
                    >
                        <Feather name="x" size={16} color="white" />
                    </TouchableOpacity>
                </View>
            )}

<<<<<<< Updated upstream

            <View className="flex-row justify-between items-center mt-3">
                <View className="flex-row">
                    <TouchableOpacity className="m-4" onPress={pickImageFromGallery}>
                        <Feather name="image" size={25} color="#1DA1F2" />
                    </TouchableOpacity>
                    <TouchableOpacity className="m-4" onPress={takePhoto}>
=======
            <View style={styles.actionsRow}>
                <View style={styles.actionButtonsLeft}>
                    <TouchableOpacity style={styles.actionButton} onPress={pickImageFromGallery}>
                        <Feather name="image" size={25} color="#1DA1F2" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionButton} onPress={takePhoto}>
>>>>>>> Stashed changes
                        <Feather name="camera" size={25} color="#1DA1F2" />
                    </TouchableOpacity>
                </View>

<<<<<<< Updated upstream
                <View className="flex-row items-center">
                    {content.length > 0 && (
                        <Text
                            className={`text-sm mr-3 ${content.length > 260 ? "text-red-500" : "text-gray-500"}`}
=======
                <View style={styles.actionButtonsRight}>
                    {content.length > 0 && (
                        <Text
                            style={[
                                styles.charCount,
                                content.length > 260 ? styles.charCountLimit : null,
                            ]}
>>>>>>> Stashed changes
                        >
                            {280 - content.length}
                        </Text>
                    )}

                    <TouchableOpacity
<<<<<<< Updated upstream
                        className={`px-6 py-2 rounded-full ${content.trim() || selectedImage ? "bg-blue-500" : "bg-gray-300"
                            }`}
=======
                        style={[
                            styles.postButton,
                            content.trim() || selectedImage ? styles.postButtonActive : styles.postButtonInactive,
                        ]}
>>>>>>> Stashed changes
                        onPress={createPost}
                        disabled={isCreating || !(content.trim() || selectedImage)}
                    >
                        {isCreating ? (
                            <ActivityIndicator size="small" color="white" />
                        ) : (
                            <Text
<<<<<<< Updated upstream
                                className={`font-semibold ${content.trim() || selectedImage ? "text-white" : "text-gray-500"
                                    }`}
=======
                                style={[
                                    styles.postButtonText,
                                    content.trim() || selectedImage
                                        ? styles.postButtonTextActive
                                        : styles.postButtonTextInactive,
                                ]}
>>>>>>> Stashed changes
                            >
                                Post
                            </Text>
                        )}
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};
<<<<<<< Updated upstream
export default PostComposer;
=======

export default PostComposer;

const styles = StyleSheet.create({
    container: {
        borderBottomWidth: 1,
        borderBottomColor: "#F3F4F6", // gray-100
        padding: 16,
        backgroundColor: "#FFFFFF",
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
    },
    profileImage: {
        width: 35,
        height: 35,
        borderRadius: 100,
        marginRight: 8,
    },
    username: {
        fontWeight: "500",
        color: "#111827", // gray-900
        marginRight: 8,
    },
    inputWrapper: {
        flex: 1,
    },
    textInput: {
        color: "#111827", // gray-900
        fontSize: 18, // text-lg
    },
    selectedImageWrapper: {
        marginTop: 12,
        width: "100%",
        height: 192, // h-48
        position: "relative",
    },
    selectedImage: {
        width: "100%",
        height: "100%",
        borderRadius: 16, // rounded-2xl
    },
    removeButton: {
        position: "absolute",
        top: 8,
        right: 8,
        width: 32,
        height: 32,
        backgroundColor: "rgba(0,0,0,0.6)",
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center",
    },
    actionsRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 12,
    },
    actionButtonsLeft: {
        flexDirection: "row",
    },
    actionButton: {
        marginHorizontal: 16,
    },
    actionButtonsRight: {
        flexDirection: "row",
        alignItems: "center",
    },
    charCount: {
        fontSize: 14,
        marginRight: 12,
        color: "#6B7280", // gray-500
    },
    charCountLimit: {
        color: "#EF4444", // red-500
    },
    postButton: {
        paddingVertical: 8,
        paddingHorizontal: 24,
        borderRadius: 9999,
    },
    postButtonActive: {
        backgroundColor: "#1DA1F2", // blue-500
    },
    postButtonInactive: {
        backgroundColor: "#D1D5DB", // gray-300
    },
    postButtonText: {
        fontWeight: "600",
    },
    postButtonTextActive: {
        color: "#FFFFFF",
    },
    postButtonTextInactive: {
        color: "#6B7280",
    },
});
>>>>>>> Stashed changes
