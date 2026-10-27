import { useState } from "react";

function Post() {
    const [postType, setPostType] = useState("question");

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [abstract, setAbstract] = useState("");
    const [articleText, setArticleText] = useState("");
    const [tags, setTags] = useState("");

    const [errors, setErrors] = useState({});

    // Validate the form when Post is clicked
    const handleSubmit = (e) => {
        e.preventDefault();

        const newErrors = {};

        // Validate title
        if (title.trim() === "") {
        newErrors.title = "Please enter a title.";
        }

        // Validate Question form
        if (postType === "question" && description.trim() === "") {
        newErrors.description = "Please describe your problem.";
        }

        // Validate Article form
        if (postType === "article" && abstract.trim() === "") {
        newErrors.abstract = "Please enter an abstract.";
        }

        if (postType === "article" && articleText.trim() === "") {
        newErrors.articleText = "Please enter the article text.";
        }

        // Validate maximum of three tags
        const tagList = tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag !== "");

        if (tagList.length > 3) {
        newErrors.tags = "You can enter a maximum of 3 tags.";
        }

        setErrors(newErrors);

        // Stop if any validation errors exist
        if (Object.keys(newErrors).length > 0) {
        return;
        }

        // Show success message
        alert(`Your ${postType === "question" ? "question" : "article"} has been submitted successfully!`);
    };

    // Clear the error for a field when the user edits it
    const clearError = (field) => {
        setErrors((prev) => ({
        ...prev,
        [field]: "",
        }));
    };

    // Change the selected post type
    const handlePostTypeChange = (type) => {
        setPostType(type);
        setErrors({});
    };

    return (
        <div className="flex-1 w-full bg-gray-100 px-4 py-8">
            <div className="mx-auto max-w-3xl rounded-lg bg-white p-6 shadow-md sm:p-8">

                {/* Page heading */}
                <h1 className="mb-6 bg-gray-200 px-4 py-3 text-xl font-bold text-gray-800">
                New Post
                </h1>

                {/* Select post type */}
                <div className="mb-6">
                <p className="mb-3 font-medium text-gray-700">
                    Select Post Type:
                </p>

                <div className="flex flex-wrap gap-6">
                    <label className="flex cursor-pointer items-center gap-2">
                    <input
                        type="radio"
                        name="postType"
                        value="question"
                        checked={postType === "question"}
                        onChange={() => handlePostTypeChange("question")}
                        className="accent-blue-600"
                    />
                    Question
                    </label>

                    <label className="flex cursor-pointer items-center gap-2">
                    <input
                        type="radio"
                        name="postType"
                        value="article"
                        checked={postType === "article"}
                        onChange={() => handlePostTypeChange("article")}
                        className="accent-blue-600"
                    />
                    Article
                    </label>
                </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} noValidate>
                    <h2 className="mb-4 bg-gray-200 px-4 py-3 font-semibold text-gray-800">
                        What do you want to ask or share
                    </h2>

                    {/* Title field */}
                    <div className="mb-5">
                        <label
                        htmlFor="title"
                        className="mb-2 block font-medium text-gray-700"
                        >
                        Title
                        </label>

                        <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => {
                            setTitle(e.target.value);
                            clearError("title");
                        }}
                        placeholder={
                            postType === "question"
                            ? "Start your question with how, what, why, etc."
                            : "Enter a descriptive title"
                        }
                        aria-invalid={Boolean(errors.title)}
                        aria-describedby={errors.title ? "title-error" : undefined}
                        className={`w-full rounded-md border px-3 py-2 outline-none focus:ring-2 ${
                            errors.title
                            ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                            : "border-gray-300 focus:border-blue-500 focus:ring-blue-200"
                        }`}
                        />

                        {errors.title && (
                        <p
                            id="title-error"
                            role="alert"
                            className="mt-2 text-sm text-red-600"
                        >
                            {errors.title}
                        </p>
                        )}
                    </div>

                    {/* Question fields */}
                    {postType === "question" && (
                        <div className="mb-5">
                        <label
                            htmlFor="description"
                            className="mb-2 block font-medium text-gray-700"
                        >
                            Describe your problem
                        </label>

                        <textarea
                            id="description"
                            rows="9"
                            value={description}
                            onChange={(e) => {
                            setDescription(e.target.value);
                            clearError("description");
                            }}
                            placeholder="Describe your question or problem..."
                            aria-invalid={Boolean(errors.description)}
                            aria-describedby={
                            errors.description ? "description-error" : undefined
                            }
                            className={`w-full resize-y rounded-md border px-3 py-2 outline-none focus:ring-2 ${
                            errors.description
                                ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                                : "border-gray-300 focus:border-blue-500 focus:ring-blue-200"
                            }`}
                        />

                        {errors.description && (
                            <p
                            id="description-error"
                            role="alert"
                            className="mt-2 text-sm text-red-600"
                            >
                            {errors.description}
                            </p>
                        )}
                        </div>
                    )}

                    {/* Article fields */}
                    {postType === "article" && (
                        <>
                        <div className="mb-5">
                            <label
                            htmlFor="abstract"
                            className="mb-2 block font-medium text-gray-700"
                            >
                            Abstract
                            </label>

                            <textarea
                            id="abstract"
                            rows="3"
                            value={abstract}
                            onChange={(e) => {
                                setAbstract(e.target.value);
                                clearError("abstract");
                            }}
                            placeholder="Enter a one-paragraph abstract"
                            aria-invalid={Boolean(errors.abstract)}
                            aria-describedby={
                                errors.abstract ? "abstract-error" : undefined
                            }
                            className={`w-full resize-y rounded-md border px-3 py-2 outline-none focus:ring-2 ${
                                errors.abstract
                                ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                                : "border-gray-300 focus:border-blue-500 focus:ring-blue-200"
                            }`}
                            />

                            {errors.abstract && (
                            <p
                                id="abstract-error"
                                role="alert"
                                className="mt-2 text-sm text-red-600"
                            >
                                {errors.abstract}
                            </p>
                            )}
                        </div>

                        <div className="mb-5">
                            <label
                            htmlFor="articleText"
                            className="mb-2 block font-medium text-gray-700"
                            >
                            Article Text
                            </label>

                            <textarea
                            id="articleText"
                            rows="9"
                            value={articleText}
                            onChange={(e) => {
                                setArticleText(e.target.value);
                                clearError("articleText");
                            }}
                            placeholder="Write your article here..."
                            aria-invalid={Boolean(errors.articleText)}
                            aria-describedby={
                                errors.articleText ? "articleText-error" : undefined
                            }
                            className={`w-full resize-y rounded-md border px-3 py-2 outline-none focus:ring-2 ${
                                errors.articleText
                                ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                                : "border-gray-300 focus:border-blue-500 focus:ring-blue-200"
                            }`}
                            />

                            {errors.articleText && (
                            <p
                                id="articleText-error"
                                role="alert"
                                className="mt-2 text-sm text-red-600"
                            >
                                {errors.articleText}
                            </p>
                            )}
                            </div>
                            </>
                    )}

                    {/* Tags field */}
                    <div className="mb-6">
                        <label
                        htmlFor="tags"
                        className="mb-2 block font-medium text-gray-700"
                        >
                        Tags
                        </label>

                        <input
                        id="tags"
                        type="text"
                        value={tags}
                        onChange={(e) => {
                            setTags(e.target.value);
                            clearError("tags");
                        }}
                        placeholder="Add up to 3 tags, e.g., Java"
                        aria-invalid={Boolean(errors.tags)}
                        aria-describedby={errors.tags ? "tags-error" : undefined}
                        className={`w-full rounded-md border px-3 py-2 outline-none focus:ring-2 ${
                            errors.tags
                            ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                            : "border-gray-300 focus:border-blue-500 focus:ring-blue-200"
                        }`}
                        />

                        <p className="mt-1 text-sm text-gray-500">
                        Separate tags with commas. Maximum 3 tags.
                        </p>

                        {errors.tags && (
                        <p
                            id="tags-error"
                            role="alert"
                            className="mt-2 text-sm text-red-600"
                        >
                            {errors.tags}
                        </p>
                        )}
                    </div>

                    {/* Post button */}
                    <div className="flex justify-end">
                        <button
                        type="submit"
                        className="rounded-md bg-blue-600 px-8 py-2 font-semibold text-white transition hover:bg-blue-700"
                        >
                        Post
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Post;