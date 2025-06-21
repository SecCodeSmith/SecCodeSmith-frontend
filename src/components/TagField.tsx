import type { BlogTagsProps } from '../untils/BlogPostProps'
import style from '@styles/Blog.module.scss';

interface TagsFieldProps {
    tag: BlogTagsProps;
    setSearchTag: React.Dispatch<React.SetStateAction<string[]>>;
    searchTag: string[];
}

export const TagField: React.FC<TagsFieldProps> = ({ tag, setSearchTag, searchTag }) => {
    const isActive = searchTag.includes(tag.slug);
    return (
        <span
            id={tag.slug}
            className={`${style.postTag} ${isActive ? style.active : ''}`}
            onClick={() => {
                setSearchTag(prev =>
                    isActive
                        ? prev.filter(t => t !== tag.slug)
                        : [...prev, tag.slug]
                );
            }}
            style={{ cursor: 'pointer' }}
        >
            {tag.name}
        </span>
    );
}

export default TagField;