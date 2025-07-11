import { api } from "@lib/api";
import mime from 'react-native-mime-types';

export default async function (postName, category, content, onProgress) {
    try {
      const fileName = content.split('/').pop() || 'upload.bin';
      const fileExtension = fileName.split('.').pop() || '';

      const mimeType = mime.lookup(fileExtension) || 'application/octet-stream';

      const form = new FormData();
      form.append("image", {
        uri: content,
        type: mimeType,
        name: fileName,
      });
      form.append("in_search", postName);
      form.append("category", category?.toLowerCase() || '');
      form.append("comments_allowed", 'true');
      form.append("reactions_allowed", 'true');

      const res = await api.v2.post('/post/publish', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
        },
        onUploadProgress: progressEvent => {
          if (progressEvent.lengthComputable) {
            const progress = progressEvent.loaded / progressEvent.total;
            onProgress(progress);
          }
        }
      });

      return res;

    } catch (error) {
      throw error;
    }
  }