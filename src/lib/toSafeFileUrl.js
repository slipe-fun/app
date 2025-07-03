const toSafeFileUri = rawUri => {
	if (!rawUri) return rawUri;

	const [scheme, ...rest] = rawUri.split("://");
	const safePath = rest.join("://").split("/").map(encodeURIComponent).join("/");

	return `${scheme}://${safePath}`;
};

export default toSafeFileUri
