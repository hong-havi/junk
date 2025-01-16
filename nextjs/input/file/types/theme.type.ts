export interface FileUploadTheme {
    container: string;
    dropzone: {
        base: string;
        dragging: string;
        uploading: string;
    };
    content: string;      // 새로 추가: 내용 컨테이너 스타일
    input: string;
    button: string;       // 새로 추가: 버튼 스타일
    icon: {
        container: string;
        color: string;
    };
    text: {
        primary: string;
        description: string;
    };
    error: {
        container: string;
        icon: string;
        text: string;
    };
}