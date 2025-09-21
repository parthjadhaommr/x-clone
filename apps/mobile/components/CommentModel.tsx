import { useComments } from "@/hooks/useComments";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { Post } from "@/types";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  ActivityIndicator,
  StyleSheet,
} from "react-native";

interface CommentsModalProps {
  selectedPost: Post;
  onClose: () => void;
}

const CommentsModal = ({ selectedPost, onClose }: CommentsModalProps) => {
  const { commentText, setCommentText, createComment, isCreatingComment } = useComments();
  const { currentUser } = useCurrentUser();

  const handleClose = () => {
    onClose();
    setCommentText("");
  };

  return (
    <Modal visible={!!selectedPost} animationType="slide" presentationStyle="pageSheet">
      {/* MODAL HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleClose}>
          <Text style={styles.closeText}>Close</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Comments</Text>
        <View style={styles.headerSpacer} />
      </View>

      {selectedPost && (
        <ScrollView style={styles.scrollContainer}>
          {/* ORIGINAL POST */}
          <View style={styles.postContainer}>
            <View style={styles.row}>
              <Image
                source={{ uri: selectedPost.user.profilePicture }}
                style={styles.profileImage}
              />

              <View style={styles.content}>
                <View style={styles.userRow}>
                  <Text style={styles.userName}>
                    {selectedPost.user.firstName} {selectedPost.user.lastName}
                  </Text>
                  <Text style={styles.userHandle}>@{selectedPost.user.username}</Text>
                </View>

                {selectedPost.content && (
                  <Text style={styles.postContent}>{selectedPost.content}</Text>
                )}

                {selectedPost.image && (
                  <Image
                    source={{ uri: selectedPost.image }}
                    style={styles.postImage}
                    resizeMode="cover"
                  />
                )}
              </View>
            </View>
          </View>

          {/* COMMENTS LIST */}
          {selectedPost.comments.map((comment) => (
            <View key={comment._id} style={styles.commentContainer}>
              <View style={styles.row}>
                <Image
                  source={{ uri: comment.user.profilePicture }}
                  style={styles.commentProfileImage}
                />

                <View style={styles.content}>
                  <View style={styles.userRow}>
                    <Text style={styles.userName}>
                      {comment.user.firstName} {comment.user.lastName}
                    </Text>
                    <Text style={styles.userHandleSmall}>@{comment.user.username}</Text>
                  </View>

                  <Text style={styles.commentText}>{comment.content}</Text>
                </View>
              </View>
            </View>
          ))}

          {/* ADD COMMENT INPUT */}
          <View style={styles.addCommentContainer}>
            <View style={styles.row}>
              <Image
                source={{ uri: currentUser?.profilePicture }}
                style={styles.commentProfileImage}
              />

              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.commentInput}
                  placeholder="Write a comment..."
                  value={commentText}
                  onChangeText={setCommentText}
                  multiline
                  numberOfLines={3}
                  textAlignVertical="top"
                />

                <TouchableOpacity
                  style={[
                    styles.replyButton,
                    commentText.trim() ? styles.replyButtonActive : styles.replyButtonInactive,
                  ]}
                  onPress={() => createComment(selectedPost._id)}
                  disabled={isCreatingComment || !commentText.trim()}
                >
                  {isCreatingComment ? (
                    <ActivityIndicator size="small" color="white" />
                  ) : (
                    <Text
                      style={[
                        styles.replyButtonText,
                        commentText.trim()
                          ? styles.replyButtonTextActive
                          : styles.replyButtonTextInactive,
                      ]}
                    >
                      Reply
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      )}
    </Modal>
  );
};

export default CommentsModal;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6", // gray-100
  },
  closeText: {
    color: "#1DA1F2",
    fontSize: 18,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  headerSpacer: {
    width: 48,
  },
  scrollContainer: {
    flex: 1,
  },
  postContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
    backgroundColor: "#FFFFFF",
    padding: 16,
  },
  row: {
    flexDirection: "row",
  },
  profileImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  commentProfileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  userRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  userName: {
    fontWeight: "bold",
    color: "#111827",
    marginRight: 4,
  },
  userHandle: {
    color: "#6B7280",
    marginLeft: 4,
  },
  userHandleSmall: {
    color: "#6B7280",
    fontSize: 14,
    marginLeft: 4,
  },
  postContent: {
    color: "#111827",
    fontSize: 16,
    lineHeight: 20,
    marginBottom: 12,
  },
  postImage: {
    width: "100%",
    height: 192,
    borderRadius: 16,
    marginBottom: 12,
  },
  commentContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
    backgroundColor: "#FFFFFF",
    padding: 16,
  },
  commentText: {
    color: "#111827",
    fontSize: 16,
    lineHeight: 20,
    marginBottom: 8,
  },
  addCommentContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
  },
  inputWrapper: {
    flex: 1,
  },
  commentInput: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    marginBottom: 12,
  },
  replyButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignSelf: "flex-start",
  },
  replyButtonActive: {
    backgroundColor: "#1DA1F2",
  },
  replyButtonInactive: {
    backgroundColor: "#D1D5DB",
  },
  replyButtonText: {
    fontWeight: "600",
  },
  replyButtonTextActive: {
    color: "#FFFFFF",
  },
  replyButtonTextInactive: {
    color: "#6B7280",
  },
});
