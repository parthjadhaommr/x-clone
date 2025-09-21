import { useCreatePost } from "@/hooks/useCreatePost";
import { useUser } from "@clerk/clerk-react";
import { Feather } from "@expo/vector-icons";
import { View, Text, Image, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";

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
                        resizeMode="cover"
                    />
                    <TouchableOpacity
                        onPress={removeImage}
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
                    >
                        <Feather name="x" size={16} color="white" />
                    </TouchableOpacity>
                </View>
            )}


            <View className="flex-row justify-between items-center mt-3">
                <View className="flex-row">
                    <TouchableOpacity className="m-4" onPress={pickImageFromGallery}>
                        <Feather name="image" size={25} color="#1DA1F2" />
                    </TouchableOpacity>
                    <TouchableOpacity className="m-4" onPress={takePhoto}>
                        <Feather name="camera" size={25} color="#1DA1F2" />
                    </TouchableOpacity>
                </View>

                <View className="flex-row items-center">
                    {content.length > 0 && (
                        <Text
                            className={`text-sm mr-3 ${content.length > 260 ? "text-red-500" : "text-gray-500"}`}
                        >
                            {280 - content.length}
                        </Text>
                    )}

                    <TouchableOpacity
                        className={`px-6 py-2 rounded-full ${content.trim() || selectedImage ? "bg-blue-500" : "bg-gray-300"
                            }`}
                        onPress={createPost}
                        disabled={isCreating || !(content.trim() || selectedImage)}
                    >
                        {isCreating ? (
                            <ActivityIndicator size="small" color="white" />
                        ) : (
                            <Text
                                className={`font-semibold ${content.trim() || selectedImage ? "text-white" : "text-gray-500"
                                    }`}
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