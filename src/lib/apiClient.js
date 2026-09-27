/**
 * Generic API Client
 */

async function request(url, options = {}) {
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  // Check content type before parsing JSON
  const contentType = response.headers.get("content-type");
  let result;

  if (contentType?.includes("application/json")) {
    result = await response.json();
  } else {
    const text = await response.text();
    throw new Error(`Expected JSON but received ${contentType || "text/html"}. Response: ${text.substring(0, 100)}`);
  }

  if (!response.ok) {
    throw new Error(result.message || "Something went wrong.");
  }

  return result;
}

const apiClient = {
  get(url) {
    return request(url);
  },

  post(url, data) {
    return request(url, {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  put(url, data) {
    return request(url, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  patch(url, data) {
    return request(url, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  },

  delete(url) {
    return request(url, {
      method: "DELETE",
    });
  },
};

export default apiClient;