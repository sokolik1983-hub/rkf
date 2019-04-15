export const fakeRequest = (mockData, errors) => {
    return new Promise((resolve, reject) => {
        process.nextTick(() =>
            errors
                ? reject({
                    error: errors
                })
                :
                resolve(mockData)
        );
    });
};