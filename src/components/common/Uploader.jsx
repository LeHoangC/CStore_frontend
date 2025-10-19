import { X } from 'lucide-react'
import React, { useState, useCallback, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'

function Uploader({
    multiple = true, // Đổi mặc định thành false
    maxFiles = 5, // Giới hạn 1 file khi single
    maxSize = 5 * 1024 * 1024, // 5MB
    onChange,
    error,
    value,
}) {
    const [previews, setPreviews] = useState([])

    // Sync with external value if provided
    useEffect(() => {
        if (value) {
            setPreviews(Array.isArray(value) ? value.map((file) => file) : [value])
        }
    }, [value])

    const handleUploadFile = async (file) => {
        const formData = new FormData()
        formData.append('attachment', file)

        try {
            const response = await fetch('/api/attachments', {
                method: 'POST',
                body: formData,
            })

            if (!response.ok) {
                throw new Error('Upload file failed')
            }

            const data = await response.json()

            return data
        } catch (error) {
            console.log(error)
        }
    }

    const onDrop = useCallback(
        async (acceptedFiles) => {
            // Nếu không phải multiple, xóa hết các file cũ
            if (!multiple) {
                setPreviews([])
            }

            const validFiles = multiple ? acceptedFiles.slice(0, maxFiles) : [acceptedFiles[0]]
            const filteredFiles = validFiles.filter((file) => file.size <= maxSize)

            const uploadPromises = filteredFiles.map(handleUploadFile)
            const uploadedFiles = await Promise.all(uploadPromises)
            const newPreviews = uploadedFiles.map((dataFile) => dataFile.image)

            // Cập nhật previews và value
            if (multiple) {
                const updatedPreviews = [...previews, ...newPreviews]
                setPreviews(updatedPreviews)
                onChange(updatedPreviews) // Cập nhật value cho form
            } else {
                setPreviews(newPreviews)
                onChange(newPreviews[0]) // Cập nhật value cho form
            }
        },
        [multiple, maxFiles, maxSize, previews, onChange]
    )

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/jpeg': ['.jpg', '.jpeg'],
            'image/png': ['.png'],
            'image/gif': ['.gif'],
            'image/webp': ['.webp'],
        },
        multiple,
        ...(multiple ? { maxFiles } : {}),
    })

    const removeFile = (index) => {
        const newPreviews = previews.filter((_, i) => i !== index)
        setPreviews(newPreviews)
        onChange(multiple ? newPreviews : newPreviews[0])
    }

    return (
        <div className="w-full mx-auto py-4">
            <div
                {...getRootProps()}
                className={`
          p-6 border-2 border-dashed rounded-lg text-center cursor-pointer
          ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-500'}
        `}
            >
                <input {...getInputProps()} />
                {isDragActive ? (
                    <p className="text-blue-500">Thả file ở đây...</p>
                ) : (
                    <p className="text-gray-500">Kéo và thả ảnh vào đây, hoặc nhấn để chọn file</p>
                )}
            </div>

            {previews.length > 0 && (
                <div className="mt-4">
                    <div className={`grid grid-cols-4 gap-4`}>
                        {previews.map((preview, index) => (
                            <div key={index} className={`relative w-full max-w-xs`}>
                                <img
                                    src={preview.url}
                                    alt={`Preview ${index + 1}`}
                                    className={`w-full object-cover rounded-lg`}
                                />
                                {multiple && (
                                    <X
                                        onClick={() => removeFile(index)}
                                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs"
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
        </div>
    )
}

export default Uploader
