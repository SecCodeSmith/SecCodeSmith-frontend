import styles from '@styles/SkillCard.module.css';
import React from 'react';
interface Skill {
    name: string;
    icon: React.ReactNode; // Or string if using CSS classes for icons
}

interface SkillCardProps {
    categoryTitle: string;
    categoryIcon: React.ReactNode; // Or string
    skills: Skill[];
}

const SkillCard: React.FC<SkillCardProps> = ({ categoryTitle, categoryIcon, skills }) => {
    return (
        <>

            <div className="col-md-6 col-lg-4">
                <div className={`card h-100 ${styles.card}`}>
                    <div className={`card-header ${styles.cardHeader}`}>
                        <i className={`fas fa-code category-icon ${styles.categoryIcon}`}></i>
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


            <div className={styles.card}>
                <div className={`card-header ${styles.cardHeader}`}>
                    <span className={`styles.categoryIcon`}>{categoryIcon}</span>
                    <h3 className={styles.categoryTitle}>{categoryTitle}</h3>
                </div>
                <div className="p-3">
                    {skills.length > 0 ? (
                        <ul className="list-unstyled mb-0">
                            {skills.map((skill, index) => (
                                <li key={index} className={styles.skillItem}>
                                    <span className={styles.skillIcon}>{skill.icon}</span>
                                    <span className={styles.skillName}>{skill.name}</span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No skills listed in this category.</p>
                    )}
                </div>
            </div>

        </>
    );
};

export default SkillCard;
