import { useCreatePost } from "@/hooks/useCreatePost";
import { useUser } from "@clerk/clerk-react";
import { Feather } from "@expo/vector-icons";
import {
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    StyleSheet,
} from "react-native";

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
                <View style={styles.selectedImageWrapper}>
                    <Image
                        source={{ uri: selectedImage }}
                        style={styles.selectedImage}
                        resizeMode="cover"
                    />
                    <TouchableOpacity
                        onPress={removeImage}
                        style={styles.removeButton}
                    >
                        <Feather name="x" size={16} color="white" />
                    </TouchableOpacity>
                </View>
            )}

            <View style={styles.actionsRow}>
                <View style={styles.actionButtonsLeft}>
                    <TouchableOpacity style={styles.actionButton} onPress={pickImageFromGallery}>
                        <Feather name="image" size={25} color="#1DA1F2" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionButton} onPress={takePhoto}>
                        <Feather name="camera" size={25} color="#1DA1F2" />
                    </TouchableOpacity>
                </View>

                <View style={styles.actionButtonsRight}>
                    {content.length > 0 && (
                        <Text
                            style={[
                                styles.charCount,
                                content.length > 260 ? styles.charCountLimit : null,
                            ]}
                        >
                            {280 - content.length}
                        </Text>
                    )}

                    <TouchableOpacity
                        style={[
                            styles.postButton,
                            content.trim() || selectedImage ? styles.postButtonActive : styles.postButtonInactive,
                        ]}
                        onPress={createPost}
                        disabled={isCreating || !(content.trim() || selectedImage)}
                    >
                        {isCreating ? (
                            <ActivityIndicator size="small" color="white" />
                        ) : (
                            <Text
                                style={[
                                    styles.postButtonText,
                                    content.trim() || selectedImage
                                        ? styles.postButtonTextActive
                                        : styles.postButtonTextInactive,
                                ]}
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
