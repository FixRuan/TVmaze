import React, { createRef } from 'react';
import { render, act, fireEvent } from '@testing-library/react-native';
import { SeasonModal } from '../SeasonModal';
import { Modalize } from 'react-native-modalize';

describe('SeasonModal', () => {
  test('whow all season option', () => {
    const modalizeRef = createRef<Modalize>();

    const { getAllByText } = render(
      <SeasonModal
        ref={modalizeRef}
        selectedSeason="1"
        onSelectSeason={season => console.debug('SeasonSelected', season)}
        seasons={['1', '2', '3']}
      />,
    );

    act(() => {
      modalizeRef.current?.open();
    });

    // Season/i -> lowercase//
    expect(getAllByText(/Season/i).length).toBe(3);
  });

  test('call onSelectSeason with correct season when season was pressed', () => {
    const modalizeRef = createRef<Modalize>();
    const onSelectSeasonMock = jest.fn();

    const { getByText } = render(
      <SeasonModal
        ref={modalizeRef}
        selectedSeason="1"
        onSelectSeason={onSelectSeasonMock}
        seasons={['1', '2', '3']}
      />,
    );

    act(() => {
      modalizeRef.current?.open();
    });

    const season2Element = getByText(/season 2/i);

    fireEvent.press(season2Element);
    expect(onSelectSeasonMock).toBeCalledWith('2');
  });
});
