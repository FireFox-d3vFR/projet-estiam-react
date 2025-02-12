import React, { useRef, useState, useEffect } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

const CustomScrollView = ({ children, horizontal, style }) => {
  const scrollViewRef = useRef(null);
  const [scrollHeight, setScrollHeight] = useState(0);
  const [contentHeight, setContentHeight] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollWidth, setScrollWidth] = useState(0);
  const [contentWidth, setContentWidth] = useState(0);
  const [horizontalScrollPosition, setHorizontalScrollPosition] = useState(0);

  const handleContentSizeChange = (contentWidth, contentHeight) => {
    setContentHeight(contentHeight);
    setContentWidth(contentWidth);
  };

  const handleScroll = (event) => {
    const { y, x } = event.nativeEvent.contentOffset;
    setScrollPosition(y);
    setHorizontalScrollPosition(x);
  };

  const handleLayout = (event) => {
    const { height, width } = event.nativeEvent.layout;
    setScrollHeight(height);
    setScrollWidth(width);
  };

  const verticalScrollbarHeight = scrollHeight * (scrollHeight / contentHeight);
  const horizontalScrollbarWidth = scrollWidth * (scrollWidth / contentWidth);

  return (
    <View style={[styles.scrollContainer, style]} onLayout={handleLayout}>
      <ScrollView
        ref={scrollViewRef}
        horizontal={horizontal}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
        onContentSizeChange={handleContentSizeChange}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {children}
      </ScrollView>
      {!horizontal && (
        <View
          style={[
            styles.verticalScrollbar,
            {
              height: verticalScrollbarHeight,
              top: (scrollPosition / contentHeight) * scrollHeight,
            },
          ]}
        />
      )}
      {horizontal && (
        <View
          style={[
            styles.horizontalScrollbar,
            {
              width: horizontalScrollbarWidth,
              left: (horizontalScrollPosition / contentWidth) * scrollWidth,
            },
          ]}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    position: "relative",
    flex: 1,
  },
  scrollViewContent: {
    paddingRight: 10,
  },
  horizontalScrollbar: {
    position: "absolute",
    bottom: 0,
    height: 4,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderRadius: 2,
  },
  verticalScrollbar: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 4,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderRadius: 2,
  },
});

export default CustomScrollView;
