export const settingDefaultValue = () => {
    return ({
        General: {
            fontsize: {
                text: {
                    text_en: 'fontsize',
                    text_ja: '文字サイズ',
                    description_en: '',
                    description_ja: '',
                },
                value: '16px',
                inputtype: {
                    type: 'number',
                    min: 1,
                    max: 9999
                }
            },
            act_name: {
                text: {
                    text_en: 'act_name',
                    text_ja: 'ACT上の自身の名前',
                    description_en: '',
                    description_ja: '',
                },
                value: 'YOU',
                inputtype: {
                    type: 'text',
                }
            }
        },
        CrystalConflict: {
            ally_teamdisp: {
                text: {
                    text_en: 'fontsize',
                    text_ja: '味方チームの合計を表示',
                    description_en: '',
                    description_ja: '',
                },
                value: true,
                inputtype: {
                    type: 'toggle',
                }
            },
            ally_playerdisp: {
                text: {
                    text_en: 'act_name',
                    text_ja: '味方プレイヤーのデータを表示',
                    description_en: '',
                    description_ja: '',
                },
                value: true,
                inputtype: {
                    type: 'toggle',
                }
            },
            ally_playerdisp_Level: {
                text: {
                    text_en: 'act_name',
                    text_ja: '味方プレイヤーデータ表示の初期表示',
                    description_en: '',
                    description_ja: '',
                },
                value: '2:Advanced',
                inputtype: {
                    type: 'list',
                    list: ['1:Simple', '2:Advanced'],
                    multiple: false
                }
            },
            enemy_teamdisp: {
                text: {
                    text_en: 'fontsize',
                    text_ja: '味方チームの合計を表示',
                    description_en: '',
                    description_ja: '',
                },
                value: true,
                inputtype: {
                    type: 'toggle',
                }
            },
            enemy_playerdisp: {
                text: {
                    text_en: 'act_name',
                    text_ja: '味方プレイヤーのデータを表示',
                    description_en: '',
                    description_ja: '',
                },
                value: true,
                inputtype: {
                    type: 'toggle',
                }
            },
            enemy_playerdisp_Level: {
                text: {
                    text_en: 'act_name',
                    text_ja: '味方プレイヤーデータ表示の初期表示',
                    description_en: '',
                    description_ja: '',
                },
                value: '2:Advanced',
                inputtype: {
                    type: 'list',
                    list: ['1:Simple', '2:Advanced'],
                    multiple: false
                }
            }
        }
    });
}