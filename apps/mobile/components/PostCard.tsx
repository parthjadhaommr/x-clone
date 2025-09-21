import { Post, User } from "@/types";
import { formatDate, formatNumber } from "@/utils/formatter";
import { AntDesign, Feather } from "@expo/vector-icons";
<<<<<<< Updated upstream
import { View, Text, Alert, Image, TouchableOpacity } from "react-native";
=======
import { View, Text, Alert, Image, TouchableOpacity, StyleSheet } from "react-native";
>>>>>>> Stashed changes

interface PostCardProps {
    post: Post;
    onLike: (postId: string) => void;
    onDelete: (postId: string) => void;
<<<<<<< Updated upstream
=======
    onComment: (post: Post) => void;
>>>>>>> Stashed changes
    isLiked?: boolean;
    currentUser: User;
}

<<<<<<< Updated upstream
const PostCard = ({ currentUser, onDelete, onLike, post, isLiked }: PostCardProps) => {
    if (!currentUser?._id) {
        return
    }
=======
const PostCard = ({ currentUser, onDelete, onLike, post, isLiked, onComment }: PostCardProps) => {
    if (!currentUser?._id) {
        return null;
    }

>>>>>>> Stashed changes
    const isOwnPost = post?.user?._id === currentUser?._id;

    const handleDelete = () => {
        Alert.alert("Delete Post", "Are you sure you want to delete this post?", [
            { text: "Cancel", style: "cancel" },
            {
                text: "Delete",
                style: "destructive",
                onPress: () => onDelete(post._id),
            },
        ]);
    };

    return (
<<<<<<< Updated upstream
        <View className="border-b border-gray-100 bg-white">
            <View className="flex-row p-4">
                <Image
                    source={{ uri: post.user.profilePicture || "" }}
                    className="w-12 h-12 rounded-full mr-3"
                />

                <View className="flex-1">
                    <View className="flex-row items-center justify-between mb-1">
                        <View className="flex-row items-center">
                            <Text className="font-bold text-gray-900 mr-1">
                                {post.user.firstName} {post.user.lastName}
                            </Text>
                            <Text className="text-gray-500 ml-1">
                                @{post.user.username} · {formatDate(post.createdAt)}
                            </Text>
                        </View>
=======
        <View style={styles.container}>
            <View style={styles.row}>
                <Image
                    source={{ uri: post.user.profilePicture || "" }}
                    style={styles.profileImage}
                />

                <View style={styles.content}>
                    <View style={styles.headerRow}>
                        <View style={styles.userInfoRow}>
                            <Text style={styles.userName}>
                                {post.user.firstName} {post.user.lastName}
                            </Text>
                            <Text style={styles.userHandle}>
                                @{post.user.username} · {formatDate(post.createdAt)}
                            </Text>
                        </View>

>>>>>>> Stashed changes
                        {isOwnPost && (
                            <TouchableOpacity onPress={handleDelete}>
                                <Feather name="trash" size={20} color="#657786" />
                            </TouchableOpacity>
                        )}
                    </View>

                    {post.content && (
<<<<<<< Updated upstream
                        <Text className="text-gray-900 text-base leading-5 mb-3">{post.content}</Text>
                    )}
=======
                        <Text style={styles.postContent}>{post.content}</Text>
                    )}
                    <Text>hello : {post.image}</Text>
>>>>>>> Stashed changes

                    {post.image && (
                        <Image
                            source={{ uri: post.image }}
<<<<<<< Updated upstream
                            className="w-full h-48 rounded-2xl mb-3"
=======
                            // style={styles.postImage}
                            style = {{
                                width : 48,
                                height : 48
                            }}
>>>>>>> Stashed changes
                            resizeMode="cover"
                        />
                    )}

<<<<<<< Updated upstream
                    <View className="flex-row justify-between max-w-xs">
                        <TouchableOpacity className="flex-row items-center" onPress={() => { }}>
                            <Feather name="message-circle" size={18} color="#657786" />
                            <Text className="text-gray-500 text-sm ml-2">
                                {formatNumber(post.comments?.length || 0)}
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity className="flex-row items-center">
                            <Feather name="repeat" size={18} color="#657786" />
                            <Text className="text-gray-500 text-sm ml-2">0</Text>
                        </TouchableOpacity>

                        <TouchableOpacity className="flex-row items-center" onPress={() => onLike(post._id)}>
=======
                    <View style={styles.actionsRow}>
                        <TouchableOpacity style={styles.actionButton} onPress={() => { onComment(post) }}>
                            <Feather name="message-circle" size={18} color="#657786" />
                            <Text style={styles.actionText}>{formatNumber(post.comments?.length || 0)}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.actionButton}>
                            <Feather name="repeat" size={18} color="#657786" />
                            <Text style={styles.actionText}>0</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.actionButton} onPress={() => onLike(post._id)}>
>>>>>>> Stashed changes
                            {isLiked ? (
                                <AntDesign name="heart" size={18} color="#E0245E" />
                            ) : (
                                <Feather name="heart" size={18} color="#657786" />
                            )}
<<<<<<< Updated upstream

                            <Text className={`text-sm ml-2 ${isLiked ? "text-red-500" : "text-gray-500"}`}>
=======
                            <Text style={[styles.actionText, isLiked ? styles.likedText : styles.unlikedText]}>
>>>>>>> Stashed changes
                                {formatNumber(post.likes?.length || 0)}
                            </Text>
                        </TouchableOpacity>

<<<<<<< Updated upstream
                        <TouchableOpacity>
=======
                        <TouchableOpacity style={styles.actionButton}>
>>>>>>> Stashed changes
                            <Feather name="share" size={18} color="#657786" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
};

<<<<<<< Updated upstream
export default PostCard;
=======
export default PostCard;

const styles = StyleSheet.create({
    container: {
        borderBottomWidth: 1,
        borderBottomColor: "#F3F4F6", // gray-100
        backgroundColor: "#FFFFFF", // white
    },
    row: {
        flexDirection: "row",
        padding: 16,
    },
    profileImage: {
        width: 35,
        height: 35,
        borderRadius: 9999,
    },
    content: {
        flex: 1,
        marginLeft: 8,
    },
    headerRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 4,
        alignItems: "center",
    },
    userInfoRow: {
        flexDirection: "row",
        alignItems: "center",
    },
    userName: {
        fontWeight: "bold",
        color: "#111827", // gray-900
        marginRight: 4,
    },
    userHandle: {
        color: "#6B7280", // gray-500
        marginLeft: 4,
    },
    postContent: {
        color: "#111827", // gray-900
        fontSize: 16,
        lineHeight: 20,
        marginBottom: 12,
        marginLeft: 12,
    },
    postImage: {
        width: "100%",
        height: 192, // 48 * 4 px for React Native units
        borderRadius: 16,
        marginBottom: 12,
    },
    actionsRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        maxWidth: 160,
    },
    actionButton: {
        flexDirection: "row",
        alignItems: "center",
    },
    actionText: {
        color: "#6B7280", // gray-500
        fontSize: 14,
        marginLeft: 8,
    },
    likedText: {
        color: "#EF4444", // red-500
    },
    unlikedText: {
        color: "#6B7280", // gray-500
    },
});
>>>>>>> Stashed changes
