import style from '@styles/PageHeader.module.scss'

interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle }) => {
  return (
    <section className={`text-center ${style.pageHeader}`}>
      <div className={`container position-relative`}>
        <h1 className={style.pageTitle}>{title}</h1>
        {subtitle && <p className={`mt-4 ${style.pageSubtitle}`}>{subtitle}</p>}
        
        {/* Binary background effect */}
        <div className="binary-bg">
          <div className={style.binaryLine} style={{ top: '20%', left: '10%' }}>01001100 01101111 01110010 01100101 01101101</div>
          <div className={style.binaryLine} style={{ bottom: '30%', right: '15%' }}>01001001 01110000 01110011 01110101 01101101</div>
          <div className={style.binaryLine} style={{ top: '50%', left: '80%' }}>01000100 01101111 01101100 01101111 01110010</div>
          <div className={style.binaryLine} style={{ bottom: '10%', left: '40%' }}>01010011 01101001 01110100 00100000 01000001 01101101 01100101 01110100</div>
        </div>
      </div>
    </section>
  )
}

export default PageHeader;