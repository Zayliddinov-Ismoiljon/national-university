
import { useEffect, useState } from "react";
import Image from "next/image";
import { GoSettings } from 'react-icons/go';
import Header from "../app/Header";
import Link from "next/link";
import { BASE_URL } from "./api";

export default function Home() {
	const [sessions, setSessions] = useState([]);

	useEffect(() => {
		const options = {
			method: 'GET',
			headers: {},
		};

		fetch(
			`${BASE_URL}/api/v1/session/getAll`,
			options,
		)
			.then((response) => response.json())
			.then((data) => {
				setSessions(data.body);
			});
	}, []);

	return (
		<>
			<Header />

			<main className='main'>
				<section className='article'>
					<div className='container'>
						<ul className='article__list'>
							<li className='article__item'>
								<img
									src='https://chem-bukhsu.uz/uz/images/sponsor_1.png'
									alt='image'
									className='article__itemimg'
								/>
							</li>
							<li className='article__item'>
								<img
									src='https://chem-bukhsu.uz/uz/images/sponsor_3.png'
									alt='image'
									className='article__itemimg'
								/>
							</li>
							<li className='article__item'>
								<img
									src='https://chem-bukhsu.uz/uz/images/sponsor_4.png'
									alt='image'
									className='article__itemimg'
								/>
							</li>
							<li className='article__item'>
								<img
									src='https://chem-bukhsu.uz/uz/images/sponsor_5.png'
									alt='image'
									className='article__itemimg'
								/>
							</li>
							<li className='article__item'>
								<img
									src='https://chem-bukhsu.uz/uz/images/sponsor_6.png'
									alt='image'
									className='article__itemimg'
								/>
							</li>
						</ul>
						<h1 className='article__title'>
							Funksional polimerlarning fundamental va amaliy jihatlari
							mavzusida xalqaro ilmiy-amaliy konferensiya
						</h1>
						<p className='article__date'>
							(Kimyo fanlari doktori, professor Muxtarjan Muxamediev
							tavalludining 70 yilligiga va ilmiy-pedagogik faoliyatining 50
							yilligiga bag‘ishlanadi)
						</p>
						<p className='article__date'>
							Mirzo Ulug‘bek nomidagi O‘zbekiston Milliy Universiteti
						</p>
						<p className='article__organized'>Tashkil etilgan:</p>
						<img
							src='https://nuu.uz/wp-content/themes/nuutheme/assets/images/dest/logo.png'
							className='article__logo'
							alt='image'
						/>
						<div className='article__btngroup'>
							<Link href='/login' className='article__login'>
								TIZIMGA KIRISH
							</Link>
							<Link href='/register' className='article__register'>
								RO&apos;YXATDAN O&apos;TISH
							</Link>
						</div>
					</div>
				</section>

				<section className='session'>
					<div className='container'>
						<h2 className='session__title'>SHO&apos;BALAR</h2>
						<ul className='session__list'>
							{sessions.map(({ name, i }) => (
								<li className='session__item' key={i} >
									<p className='session__itemtext'>
										{name}
									</p>
								</li>
							))}
						</ul>
					</div>
				</section>
				<section className='consider'>
					<div className='container'>
						<h2 className='consider__title'>Nimalarni inobatga olish kerak?</h2>
						<ul className='consider__list'>
							<li className='consider__item'>
								<GoSettings size={50} color='green' />
								<div className='consider__current'>
									<h3 className='consider__curtitle'>Konferensiya mazmuni</h3>
									<p className='consider__curtext'>
										Xalqaro ilmiy-amaliy konferensiyada ishtirok etish uchun
										to‘liq 2-3 sahifa hajmda va puxta tahrirlangan tezislar
										to‘plamda chop etiladi va ularning barchasi Google Scholar
										bazasida indekslanadi. Ekspertlar tomonidan ilmiy va
										innovasion jihatdan yuqori baholab tanlangan tezislar Scopus
										bazasida indekslangan jurnalda maqolalar ko‘rinishida nashr
										etilishi rejalashtirilgan. Konferensiyaga maqolalarni 2023
										yil 10 martga qadar telegram (+998946611818) raqami orqali
										qabul qilinadi. <br />
										<strong style={{ fontWeight: 'bold' }}>
											Konferensiyaning asosiy tadbirlari:
										</strong>
										Konferensiya ishtirokchilari sertifikat bilan
										taqdirlanadilar. <br />
										<strong style={{ fontWeight: 'bold' }}>
											Maqola tayyorlash talablari:
										</strong>
										matn formati: Microsoft Word 2007-2010 (*.doc, .docx);
										sahifa formati: A4 (210×297 mm); hoshiya (yuqoridan,
										pastdan, o‘ngdan, chapdan); 2,0×2,0×2,5×1,5 sm; shrift:
										Times New Roman, o‘lchami (kegl) - 12; qator oraliq
										intervali: 1 pt (bir); <br />
										<strong style={{ fontWeight: 'bold' }}>
											Maqola matni tuzilishi:
										</strong>{' '}
										maqolaning nomi (katta harflarda,qalin shrift, o‘rtada
										yoziladi); muallif(lar)ning F.I.Sh.ilmiy darajasi, unvoni,
										lavozimi, ish (o‘qish) joyi (o‘rtada yoziladi); annotasiya
										(maqola yozilgan tilda kegl 12 kursivda, hajmi 20 so‘zdan
										kam bo‘lmagan, eni bo‘yicha yoziladi); tayanch so‘zlar
										(kegl 12 kursivda, 5 ta so‘zdan kam bo‘lmagan, eni bo‘yicha
										yoziladi); bir qator tashlab  maqolaning asosiy matni (kegl&apos;
										12, qatorlar oraliq intervali - 1, xat boshi - 1,25 sm, eni
										bo‘yicha yoziladi); foydalanilgan adabiyotlar ro‘yxati (eni
										bo‘yicha yoziladi); tezislar elektron variantda RTF
										formatida har bir sho‘ba nomi ko‘rsatilgan (Namuna:
										1-sho‘ba D.Usmanov) nomlangan holda takdim etiladi.
									</p>
								</div>
							</li>
							<li className='consider__item'>
								<GoSettings size={50} color='green' />
								<div className='consider__current'>
									<h3 className='consider__curtitle'>Axborot xati</h3>
									<p className='consider__curtext'>
										O‘zbekiston Respublikasi Prezidentining «Kimyo sanoati
										korxonalarini yanada isloh qilish va moliyaviy
										sog‘lomlashtirish, yuqori qo‘shilgan qiymatli kimyoviy
										mahsulotlar ishlab chiqarishni rivojlantirish
										chora-tadbirlari to‘g‘risida» 2021 yil 13 fevraldagi
										PQ-4992-son Qarori va “Respublika oziq-ovqat sanoatini jadal
										rivojlantirish hamda aholini sifatli oziq-ovqat mahsulotlari
										bilan to‘laqonli ta&apos;minlashga doir chora-tadbirlar
										to‘g‘risida” 2020 yil 9 sentyabrdagi PQ-4821-son Qarorlari,
										shuningdek Vazirlar Mahkamasining “Ilmiy-innovasion ishlanma
										va texnologiyalarni ishlab chiqarishga tadbiq etishning
										samarali mexanizmlarini yaratish chora tadbirlari
										to‘g‘risida” 2018 yil 12-yanvardagi 24-son qaroriga muvofiq,
										2022 yil 7-martdagi 101-F sonli Farmoyishi ijrosini
										ta&apos;minlash maqsadida, mamlakat ilm-fani nufuzini yanada
										oshirish va Respublika ilmiy-texnik hamkorlik ko‘lamini
										kengaytirishga qaratilgan Xalqaro va Respublika miqyosidagi
										ilmiy anjumanlar, simpoziumlar, seminarlar va boshqa ilmiy
										hamda ilmiy-texnik tadbirlarning yuqori ilmiy va
										tashkiliy-amaliy darajada samarali o‘tkazilishini ta&apos;minlash
										maqsadida 2023 yilning 17-18 mart kunlari O‘zbekiston Milliy
										Univeristetida “Funksional polimerlarning fundamental va
										amaliy jixatlari” mavzusida xalqaro ilmiy-amaliy
										konferensiyasi o‘tkaziladi. <br /> <br />
										Konferensiya materiallari to‘plami mualliflar matnidan
										bevosita o‘zgartirishsiz chop etiladi. Shuning uchun
										tezisdagi grammatik va imloviy xatolar uchun mualliflar
										shaxsan o‘zlari javobgardir!
									</p>
								</div>
							</li>
							{/* <li className='consider__item'>
								<GoSettings size={50} color='green' />
								<div className='consider__current'>
									<h3 className='consider__curtitle'>
										Requirements for materials
									</h3>
									<p className='consider__curtext'>
										text format: Microsoft Word 2007-2010 (*.doc, docx) page
										format: A4 (210×297 mm); margins (top, bottom, right, left);
										2.0×2.0×2.5×1.5 cm; font: Times New Roman, size (size) - 12;
										line spacing: 1.0.
									</p>
								</div>
							</li>
							<li className='consider__item'>
								<GoSettings size={50} color='green' />
								<div className='consider__current'>
									<h3 className='consider__curtitle'>
										Requirements for materials
									</h3>
									<p className='consider__curtext'>
										text format: Microsoft Word 2007-2010 (*.doc, docx) page
										format: A4 (210×297 mm); margins (top, bottom, right, left);
										2.0×2.0×2.5×1.5 cm; font: Times New Roman, size (size) - 12;
										line spacing: 1.0.
									</p>
								</div>
							</li> */}
						</ul>
					</div>
				</section>
			</main>

			<footer className='footer'>
				<div className='footer__top'>
					<div className='container'>
						<div className='footer__current'>
							<div className='footer__topinfo footer__after1'>
								<h3 className='footer__toptitle'>Manzil</h3>
								<span className='footer__toptext'>
									100174, Toshkent shahri, Universitet ko‘chasi, 4.
								</span>
							</div>
							<div className='footer__topinfo footer__after2'>
								<h3 className='footer__toptitle'>Bog&apos;lanish</h3>
								<a
									href='https://t.me/Zayliddinov_Ismoiljon'
									className='footer__link'
									target='_self'>
									https://nuu.uz/
								</a>
								<br />
								<div>
									<span>Ilmiy bo&apos;lim: </span>
									<a href='tel:+998712271034' className='footer__tel'>
										+998712271034
									</a>
								</div>
								<div>
									<span>M.Maxkamov: </span>
									<a href='tel:+998973434716' className='footer__tel'>
										+998 973434716
									</a>
								</div>
								<div>
									<span>D.Bekjanov: </span>
									<a href='tel:+998909702063' className='footer__tel'>
										+998909702063
									</a>
								</div>
								<br />
								<a
									href='mailto:conf.functional.polymers2023@gmail.com'
									className='footer__email'>
									conf.functional.polymers2023@gmail.com
								</a>
								<br />
								<span className='footer__card'>
									Card: 8600 1309 5892 4799 (Dilbar Shaxidova)
								</span>
							</div>
						</div>
					</div>
				</div>
				<div className='footer__inner'>
					<div className='container'>
						<p className='footer__copy'>nuu.uz 2023 © All rights reserved</p>
					</div>
				</div>
			</footer>
		</>
	);
}
