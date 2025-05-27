import styles from '@styles/SkillCard.module.scss';
import React from 'react';

import type {SkillCardProps} from '../untils/SkillCardProps';

const SkillCard: React.FC<SkillCardProps> = ({ categoryTitle, categoryIcon, skills }) => {
    return (
        <div className="col-md-6 col-lg-4">
            <div className={`card h-100 ${styles.card}`}>
                <div className={`card-header ${styles.cardHeader}`}>
                    <i className={`fas ${categoryIcon} category-icon ${styles.categoryIcon}`}></i>
                    <h3 className={`${styles.categoryTitle}`}>{categoryTitle}</h3>
                </div>
                <div className="card-body">
                    {skills.length > 0 ? (
                        <ul className="list-unstyled mb-0">
                            {skills.map((skill, index) => (
                                <li key={index} className={styles.skillItem}>
                                    <span className={styles.skillIcon}><i className={`${skill.icon ?? ""}`}></i></span>
                                    <span className={styles.skillName}>{skill.name}</span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No skills listed in this category.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SkillCard;
