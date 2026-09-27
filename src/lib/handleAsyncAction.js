
import { toast } from "sonner";

/**
 * Handles Redux Toolkit async thunk results.
 *
 * @param {Function} dispatch
 * @param {Function} thunk
 * @param {*} payload
 * @param {Object} options
 *
 * @returns thunk result
 */
export async function handleAsyncAction(
    dispatch,
    thunk,
    payload,
    options = {}
) {
    const {
        successMessage,
        errorMessage,
        onSuccess,
        onError,
    } = options;

    const result = await dispatch(thunk(payload));

    if (thunk.fulfilled.match(result)) {
        if (successMessage) {
            toast.success(successMessage);
        }

        onSuccess?.(result.payload);

        return {
            success: true,
            data: result.payload,
        };
    }

    const message =
        result.payload ||
        errorMessage ||
        "Something went wrong.";

    toast.error(message);

    onError?.(message);

    return {
        success: false,
        error: message,
    };
}