import $ from 'jquery';

const ajax = async <T> (opts: JQueryAjaxSettings): Promise<T | null> => {
    return new Promise<T | null>((resolve: (value: T | null) => void) => {
        $.ajax({
            ...opts,
            success: (data: T) => resolve(data),
            error: (_xhr, _status, _err) => {
                console.error('Request failed');
                resolve(null);
            },
        });
    });
}

export const get = async <T> (url: string): Promise<T | null> => {
    return await ajax<T>({
        method: 'GET',
        url,
    });
}