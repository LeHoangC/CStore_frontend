import { Controller } from 'react-hook-form'
import Uploader from '../common/Uploader'

const FileInput = ({ control, name, multiple, error }) => {
    return (
        <div>
            <Controller
                control={control}
                name={name}
                defaultValue={multiple ? [] : null}
                render={({ field: { onChange, value } }) => (
                    <Uploader multiple={multiple} onChange={onChange} value={value} error={error} />
                )}
            />
        </div>
    )
}

export default FileInput
