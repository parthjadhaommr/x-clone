import { Post, User } from "@/types";
import { formatDate, formatNumber } from "@/utils/formatter";
import { AntDesign, Feather } from "@expo/vector-icons";
import { View, Text, Alert, Image, TouchableOpacity, StyleSheet } from "react-native";

interface PostCardProps {
    post: Post;
    onLike: (postId: string) => void;
    onDelete: (postId: string) => void;
    onComment: (post: Post) => void;
    isLiked?: boolean;
    currentUser: User;
}

const PostCard = ({ currentUser, onDelete, onLike, post, isLiked, onComment }: PostCardProps) => {
    if (!currentUser?._id) {
        return null;
    }

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

                        {isOwnPost && (
                            <TouchableOpacity onPress={handleDelete}>
                                <Feather name="trash" size={20} color="#657786" />
                            </TouchableOpacity>
                        )}
                    </View>

                    {post.content && (
                        <Text style={styles.postContent}>{post.content}</Text>
                    )}
                    <Text>hello : {post.image}</Text>

                    {post.image && (
                        <Image
                            source={{ uri: post.image }}
                            // style={styles.postImage}
                            style = {{
                                width : 48,
                                height : 48
                            }}
                            resizeMode="cover"
                        />
                    )}

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
                            {isLiked ? (
                                <AntDesign name="heart" size={18} color="#E0245E" />
                            ) : (
                                <Feather name="heart" size={18} color="#657786" />
                            )}
                            <Text style={[styles.actionText, isLiked ? styles.likedText : styles.unlikedText]}>
                                {formatNumber(post.likes?.length || 0)}
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.actionButton}>
                            <Feather name="share" size={18} color="#657786" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
};

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
